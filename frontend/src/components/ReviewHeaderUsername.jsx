import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';
import { Rating } from './Rating';


const ReviewHeaderUsername = props => {
    const userRepo = new UserRepository();
    const [user, setUser] = useState(undefined);
    
    useEffect(() => {
        console.log("Hi " + props.review.userID)
        userRepo.getUserByID(props.review.userID).then(x => setUser(x.data[0]));
    }, []);


    if (!user) {
        return <>
            {console.log("!props.review")}
            <div>Loading restarant...</div>
        </>
    }
    else {
        return (
            <>
                {console.log("Card " + props.userID)}
                    <CardHeader > { user.username }</CardHeader>          
            </>
        );
    }
};

export default ReviewHeaderUsername;
