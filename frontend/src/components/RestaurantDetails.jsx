import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserContext } from '../context';
import { Header } from "./Header";


export const RestaurantDetails = () => {

    const [userContext, setUserContext] = useContext(UserContext);
    const [restaurant, setRestaurant] = useState(undefined);
    const [menu, setMenu] = useState(undefined);
    const restRepo = new RestaurantRepository();
    const { restaurantID } = useParams();
    //let restID = params.restaurantID

    useEffect(() => {
        console.log("ID: " + restaurantID);
        restRepo.getRestaurant(restaurantID).then(x => setRestaurant(x.data[0]));
        restRepo.getMenuItems(restaurantID).then(x => setMenu(x.data));
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
                    <div className="card-title">
                        <h2>{restaurant.restaurantName}</h2>
                    </div>
                    <div className="card-body">
                        <p>Location {restaurant.location}</p>
                        <p>Hours {restaurant.hours}</p>
                        <p>Cuisine Type {restaurant.cuisineType}</p>
                    </div>
                    <hr />
                    <h4>Featured Items</h4>
                    <hr/>
                    <h4>Menu</h4>
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Meal Type</th>
                                    <th>Likes</th>
                                    <th>Dislikes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    menu.map((x, i) =>
                                        <tr key={i}>
                                            <th className="fw-normal">{x.itemName}</th>
                                            <th className="fw-normal">${x.price}</th>
                                            <th className="fw-normal">{x.mealType}</th>
                                            <th className="fw-normal">{x.likes}</th>
                                            <th className="fw-normal">{x.dislikes}</th>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </>
        );
    }

};