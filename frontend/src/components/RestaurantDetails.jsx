import React, { useContext, useState, useEffect } from 'react';
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserContext } from '../context';
import { Header } from "./Header";


export const RestaurantDetails = (restID) => {

    const [userContext, setUserContext] = useContext(UserContext);
    const [restaurant, setRestaurant] = useState(undefined)
    const restRepo = new RestaurantRepository();

    useEffect(() => {
        restRepo.getRestaurant(1).then(x => setRestaurant(x.data[0]));
    }, []);

    if (!restaurant) {
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
                </div>

            </>
        );
    }

};