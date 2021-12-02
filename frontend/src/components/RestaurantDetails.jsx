import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserContext } from '../context';
import { Header } from "./Header";
import { MenuItemRepository } from '../api/menuItemRepository';
import { RestaurantReviewList, ReviewList } from './ReviewList';
import Card from 'react-bootstrap/Card';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Rating } from './Rating';
import { UserRepository } from '../api/userRespository';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ReviewHeaderUsername from './ReviewHeaderUsername';
import ReviewSubList from './ReviewSubList';

const sharePopover = (
    <Popover className="p-2 text-center" id="popover-positioned-down" title="Share a link!">
        <strong>Restaurant link copied to clipboard!</strong><br />
        {window.location.href}
    </Popover>
);

export const RestaurantDetails = () => {

    const itemRepo = new MenuItemRepository();
    const restRepo = new RestaurantRepository();
    const [userContext, setUserContext] = useContext(UserContext);
    const userRepo = new UserRepository();

    const [restaurant, setRestaurant] = useState(undefined);
    const [menu, setMenu] = useState(undefined);
    const [featuredItems, setFeaturedItems] = useState(undefined);
    const [popularItems, setPopularItems] = useState(undefined);
    const [reviews, setReviews] = useState(undefined);
    const [rating, setRating] = useState('');
    const [reviewBody, setReviewBody] = useState("");
    const [socialMediaName, setSocialMediaName] = useState("");
    const [shareURL, setShareURL] = useState("");
    const { restaurantID } = useParams();

    const sharePopover = (
        <Popover className="p-2 text-center" id="popover-positioned-down" title="Share a link!">
            <strong>Please share THIS LINK below!</strong><br/>
            {shareURL}
        </Popover>
    );

    useEffect(() => {
        console.log("ID: " + restaurantID);
        restRepo.getRestaurant(restaurantID).then(x => setRestaurant(x.data[0]));
        restRepo.getMenuItems(restaurantID).then(x => setMenu(x.data));
        restRepo.getFeatItems(restaurantID).then(x => setFeaturedItems(x.data));
        restRepo.getPopItems(restaurantID).then(x => setPopularItems(x.data));
        restRepo.getRestaurantReviews(restaurantID).then(x => setReviews(x.data));
        restRepo.getSocialMediaName(restaurantID).then(x => setSocialMediaName(x.data[0].socialMediaName));
        console.log(restaurant);
    }, []);

    if (!restaurant || !menu || !featuredItems || !reviews) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <>
                <Header />
                <br />
                <div className="container card">
                    <div className="card-title d-flex mx-auto px-auto mt-3">
                        <div className="p-2 flex-grow-1">
                            <h1>{restaurant.restaurantName}</h1>
                        </div>
                        <div className="d-flex align-middle">
                            <div className="p-2">
                                <OverlayTrigger trigger="click" placement="bottom" overlay={sharePopover}>
                                    <div onClick={() => { navigator.clipboard.writeText(window.location.href) }}
                                        className="mx-auto btn btn-outline-secondary" >
                                        <i className="bi bi-share-fill text-info mr-1 detailsSocials" style={{ fontSize: 20 }}></i>
                                    </div>
                                </OverlayTrigger>
                            </div>
                            <div className="p-2">
                                <div onClick={() => window.open(`https://www.instagram.com/${socialMediaName}/`, "_blank")}
                                    className="mx-auto btn btn-outline-secondary">
                                    <i className="bi bi-instagram text-info mr-1 detailsSocials" style={{ fontSize: 20 }}></i>
                                </div>
                            </div>
                            <div className="p-2">
                                <div onClick={() => window.open(`https://${restaurant.website}/`, "_blank")}
                                    className="mx-auto btn btn-outline-secondary">
                                    <i className="bi bi-globe text-info mr-1 detailsSocials" style={{ fontSize: 20 }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="p-2 flex-grow">City: {restaurant.location}</p>
                        <p className="p-2 flex-grow"> Hours: {restaurant.hours}</p>
                        <p className="p-2 flex-grow">Cuisine Type: {restaurant.cuisineType}</p>
                    </div>


                    <hr />
                    <div className="popItems my-2">
                        <div className="d-flex justify-content-center">
                            <h2>Most Popular Items</h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            {
                                popularItems.map((x, i) =>
                                    <div key={i}>
                                        <li className="list-group-item list-group-item-success">{x.itemName} (${x.price})</li>
                                    </div>)
                            }
                        </div>
                    </div>
                    <div className="popItems my-2">
                        <div className="d-flex justify-content-center my-3">
                            <h2>Featured Items</h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            {
                                featuredItems.map((x, i) =>
                                    <div key={i}>
                                        <li className="list-group-item list-group-item-primary">{x.itemName} (${x.price}) -- {x.description}</li>
                                    </div>)
                            }
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center">
                        <h2>Menu</h2>
                    </div>
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Meal Type</th>
                                    <th>Like</th>
                                    <th>Dislike</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    menu.map((x, i) =>
                                        <tr key={i}>
                                            <th className="fw-normal">{x.itemName}</th>
                                            <th className="fw-normal">${x.price}</th>
                                            <th className="fw-normal">{x.mealType}</th>
                                            <th className="fw-normal">
                                                <button type="submit" className="btn btn-outline-success mx-auto" onClick={() => itemRepo.incrementLikes(x.itemID)} > Upvote </button>
                                            </th>
                                            <th className="fw-normal">
                                                <button className="btn btn-outline-danger mx-auto" onClick={() => itemRepo.incrementDislikes(x.itemID)}> Downvote </button>
                                            </th>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div className="container">
                        <h4>{restaurant.restaurantName} Reviews ({!reviews.length ? 0 : reviews.length})</h4>
                        <div className="d-flex flex-row justify-content-center">
                            <Card.Body className="p-2 mx-l" style={{ width: '75%' }}>
                                <ul className="d-grid gap-3 mb-3 p-3 mx-auto" style={{ width: '100%' }}>
                                    {
                                        !reviews.length && <Card className="p-2 bg-light mb-1"> This restaurant has not recieved any reviews  </Card>
                                    }
                                    {
                                        reviews.map((x, i) => <Card key={ i }>
                                            <CardHeader>
                                            <ReviewHeaderUsername review = {x}  />
                                            </CardHeader>                    
                                                          
                                                <div className="row justify-content-evenly">
                                                    <div className="text-rigth text-muted col-5"><Rating value = { x.rating}/></div>
                                                    <div className="text-end text-muted col-5">{ x.date}</div>
                                                </div> 
                                                <div className="m-3">{ x.body }</div>
                                        </Card>)
                                    }
                                </ul>
                            </Card.Body>
                        </div>
                    </div>

                    <div className="container">
                        <form className="card reviewForm">
                            <h5 className="card-header fw-bolder">Add review</h5>
                            <div className="card-body row">
                                <div className="form-group">
                                    <label htmlFor="ratingField">Rating</label>
                                    <select id="ratingField"
                                        name="ratingField"
                                        className="form-control"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value={0} defaultValue></option>
                                        <option value={1}>1 star</option>
                                        <option value={2}>2 stars</option>
                                        <option value={3}>3 stars</option>
                                        <option value={4}>4 stars</option>
                                        <option value={5}>5 stars</option>
                                    </select>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="comments">Comments</label>
                                    <textarea
                                        id="comments" name="comments"
                                        value={reviewBody}
                                        onChange={(e) => setReviewBody(e.target.value)}
                                        className="form-control" />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-primary mx-3" onClick={() => this.onAddClick()}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br /><br />
                </div>
            </>
        );
    }
};