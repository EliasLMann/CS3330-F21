import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';
import { Rating } from './Rating';


export const UpdateReview = () => {
    const userRepo = new UserRepository();
    const restRepo = new RestaurantRepository();
    const [reviews, setReviews] = useState(undefined);
    const [userContext, setUserContext] = useContext(UserContext);
    const [restaurant, setRestaurant] = useState("");

    const getRestaurantName = async (restaurantID) => {
        userRepo.getRestaurant(restaurantID).then(x => setRestaurant(x.data[0].restaurantName));
    }

    useEffect(() => {
        let userID = userRepo.currentUser().userId;
        let restID = userRepo.currentUser().restaurantID;
        //let name = restRepo.getRestaurant(102);
        //console.log("RestName: " + name)
        console.log("User ID: " + userID)


        if (userRepo.currentUser().restaurantID !== null) {
            restRepo.getRestaurantReviews(restID).then(x => setReviews(x.data));
            console.log(reviews);
        }
        else {
            userRepo.getUserReviews(userID).then(x => setReviews(x.data));
        }



        console.log("Reviews: " + reviews);
    }, []);


    if (!reviews) {
        return <>
            <div>Loading reviews...</div>
        </>
    }
    else {
        return (
            <>
                {
                    console.log("Review1" + reviews[0]),
                    console.log("reviews[1]" + reviews[1])
                }
                <h1 className="ms-5">{userContext.username}</h1>

            </>
        );
    }
};

