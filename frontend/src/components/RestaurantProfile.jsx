import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import { UserRepository } from '../api/userRespository';
import { Header } from './Header';
import { RestaurantRepository } from '../api/restaurantRepository';
import { ReviewList } from './ReviewList';

const CustomerView = () => {
    const userRepo = new UserRepository();
    const [userContext, setUserContext] = useContext(UserContext);

    useEffect(() => {
        const user = userContext;
        let userID = userRepo.currentUser().userID;
        setUserContext(userRepo.currentUser());

        
        console.log("userID: " + userContext.userId)
    }, []);

    return (
        <>
            <Header />
            <ReviewList/>

        </>
    )
}

const RestaurantView = () => {
    const restRepo = new RestaurantRepository();
    const userRepo = new UserRepository();
    const [restaurant, setRestaurant] = useState(undefined);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        let restID = userRepo.currentUser().restaurantID;
        restRepo.getRestaurant(restID).then(x => setRestaurant(x.data[0]));
        console.log(restaurant)
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
                <div className="container d-flex justify-content-center">
                    <h1>{restaurant.restaurantName}</h1>
                </div>
                <div className="card">
                        <p>Location: {restaurant.location}</p>
                        <p>Hours: {restaurant.hours}</p>
                        <p>Cuisine Type: {restaurant.cuisineType}</p>
                    </div>
                <ReviewList/>
            </>
        )
    }
}




export const Profile = () => {
    const userRepo = new UserRepository();
    const [restaurantOwner, setRestaurantOwner] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);

    useEffect(() => {

        if (userRepo.currentUser().restaurantID !== null) {
            setRestaurantOwner(true);
        }
    }, []);

    return restaurantOwner ? <RestaurantView /> : <CustomerView />;
}