import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserContext } from '../context';
import { Header } from "./Header";
import { MenuItemRepository } from '../api/menuItemRepository';



export const RestaurantDetails = () => {

    const itemRepo = new MenuItemRepository();
    const [userContext, setUserContext] = useContext(UserContext);
    const [restaurant, setRestaurant] = useState(undefined);
    const [menu, setMenu] = useState(undefined);
    const [featuredItems, setFeaturedItems] = useState(undefined)
    const restRepo = new RestaurantRepository();
    const { restaurantID } = useParams();
    //let restID = params.restaurantID

    useEffect(() => {
        console.log("ID: " + restaurantID);
        restRepo.getRestaurant(restaurantID).then(x => setRestaurant(x.data[0]));
        restRepo.getMenuItems(restaurantID).then(x => setMenu(x.data));
        // restRepo.getFeaturedItems(restaurantID).then(x => setFeaturedItems(x.data));
        console.log(featuredItems);
    }, []);

    if (!restaurant || !menu) {
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
                        <h2>{restaurant.restaurantName}</h2>
                    </div>
                    <div className="card-body">
                        <p>Location: {restaurant.location}</p>
                        <p>Hours: {restaurant.hours}</p>
                        <p>Cuisine Type: {restaurant.cuisineType}</p>
                    </div>
                    <hr />
                    <h4>Featured Items</h4>
                    <div>
                    {/* {
                        featuredItems.map((x, i) =>
                            <div className="row justify-content-center" key={i}>
                                <div className="card col-5">
                                    <h3 className="card-title mx-auto">{x.itemName}</h3>
                                    <div className="card-body mx-auto">
                                        <h5>${x.price}</h5>
                                        <p>{x.description}</p>
                                    </div>
                                </div>
                            </div>)
                    } */}
                    </div>
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
                                {/* {
                                    menu.map((x, i) =>
                                        <tr key={i}>
                                            <th className="fw-normal">{x.itemName}</th>
                                            <th className="fw-normal">${x.price}</th>
                                            <th className="fw-normal">{x.mealType}</th>
                                            <th className="fw-normal">
                                                <button className="mx-auto" onClick={() => itemRepo.incrementLikes(x.itemID)} > {x.likes} </button>
                                            </th>
                                            <th className="fw-normal">
                                                <button className="mx-auto" onClick={() => itemRepo.incrementDislikes(x.itemID)}> {x.dislikes} </button>
                                            </th>
                                        </tr>)
                                } */}
                            </tbody>
                        </table>
                    </div>
                    <hr/>
                    <h4>Reviews</h4>
                </div>

            </>
        );
    }

};