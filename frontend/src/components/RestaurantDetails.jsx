import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserContext } from '../context';
import { Header } from "./Header";
import { MenuItemRepository } from '../api/menuItemRepository';
import { ReviewList } from './ReviewList';
import { RestaurantReviewList, ReviewList } from './ReviewList';
import Card from 'react-bootstrap/Card';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Rating } from './Rating';
import { UserRepository } from '../api/userRespository';



export const RestaurantDetails = () => {

    const itemRepo = new MenuItemRepository();
    const restRepo = new RestaurantRepository();
    const [userContext, setUserContext] = useContext(UserContext);
    const restRepo = new RestaurantRepository();
    const userRepo = new UserRepository();                                                            //Added by Everett


    const [restaurant, setRestaurant] = useState(undefined);
    const [menu, setMenu] = useState(undefined);
    const [featuredItems, setFeaturedItems] = useState(undefined);
    const [reviews, setReviews] = useState(undefined);
    const [rating, setRating] = useState('');
    const [reviewBody, setReviewBody] = useState("")
    const { restaurantID } = useParams();

    useEffect(() => {
        console.log("ID: " + restaurantID);
        restRepo.getRestaurant(restaurantID).then(x => setRestaurant(x.data[0]));
        restRepo.getMenuItems(restaurantID).then(x => setMenu(x.data));
        restRepo.getFeatItems(restaurantID).then(x => setFeaturedItems(x.data));
        restRepo.getRestaurantReviews(restaurantID).then(x => setReviews(x.data));
        console.log(reviews);
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
                <div className="container card">
                    <div className="card-title mx-auto px-auto">
                        <h1>{restaurant.restaurantName}</h1>
                    </div>
                    <div className="card-body">
                        <p>Location: {restaurant.location}</p>
                        <p>Hours: {restaurant.hours}</p>
                        <p>Cuisine Type: {restaurant.cuisineType}</p>
                    </div>
                    <hr />
                    <h2 className="d-flex justify-content-center">Featured Items</h2>
                    <ul className="mx-auto">
                        {
                            featuredItems.map((x, i) =>
                                <div key={i}>
                                    <li className="list-group-item list-group-item-primary">{x.itemName} (${x.price}) -- {x.description}</li>
                                </div>)
                        }
                    </ul>
                    <hr />
                    <h4>Menu</h4>
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
                    <h4>Reviews</h4>
                
                    <h4>{restaurant.restaurantName} Reviews ({!reviews.length ? 0 : reviews.length})</h4>
                    <div className="d-flex flex-row justify-content-center">
                        <Card.Body className="p-2 mx-l" style={{ width: '75%' }}>
                                <ul className="d-grid gap-3 mb-3 p-3 mx-auto" style={{ width: '100%' }}>
                                    {
                                        !reviews.length && <Card className="p-2 bg-light mb-1"> This restaurant has not recieved any reviews  </Card>
                                    }
                                    {
                                        reviews.map((x, i) => <Card key={ i }>
                                    {    
                                        !userRepo.currentUser().restaurantID ? 
                                            <CardHeader > { x.userID }</CardHeader> : 
                                            <CardHeader className="position-relative"> <div>{ x.userID }</div> 
                                                <form>
                                                    <div className="position-absolute top-0 end-0 me-4">
                                                        <label className="form-check-label" for="sponsered">Sponsor Review</label>
                                                        <input type="checkbox" className="form-check-input" id="sponsered"/>
                                                    </div>
                                                    
                                                </form>
                                                {/* <div className="position-absolute top-0 end-0 me-4">{ x.restaurantID }</div>   */}
                                            </CardHeader>
                                        // !userRepo.currentUser().restaurantID ? <CardHeader className="position-relative"> <div>{ x.restaurantID }</div> <div className="position-absolute top-0 end-0 me-4"> restaurant </div>  </CardHeader> : <CardHeader> <div className="position-absolute top-0 end-0">{ x.restaurantID }</div> <div>{ x.userID }</div></CardHeader>   
            
                                    }                        
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
                  
                    <div>
                        {/* <ReviewList props={reviews} /> */}
                    </div>
                    <div className="container">
                <form className="card reviewForm">
                    <h5 className="card-header fw-bolder">Add review</h5>
                    <div className="card-body row">
                        <div className="form-group col">
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
                        <div class="d-grid gap-2">
                        <button type="button" className="btn btn-primary mx-3" onClick={() => this.onAddClick()}>Submit</button>
                        </div>
                        <button type="button" className="btn btn-primary col-1 mx-3" onClick={() => this.onAddClick()}>Submit</button>
                    </div>
                </form>
            </div>
                    <br/><br/>
                </div>
                

            </>
        );
    }

};