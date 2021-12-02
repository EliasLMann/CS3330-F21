import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';
import { Rating } from './Rating';


const ReviewSubList = props => {
    const restRepo = new RestaurantRepository();
    const [restaurant, setRestaurant] = useState(undefined);
    
    useEffect(() => {
        console.log("Hi ")
        restRepo.getRestaurant(props.review.restaurantID).then(x => setRestaurant(x.data[0]));
    }, []);


    if (!restaurant) {
        return <>
            {console.log("!props.review")}
            <div>Loading restarant...</div>
        </>
    }
    else {
        return (
            <>
                {console.log("Card " + props.review.restaurantID)}
                    <CardHeader > { restaurant.restaurantName }</CardHeader>          
            </>
        );
    }
};

export default ReviewSubList;
