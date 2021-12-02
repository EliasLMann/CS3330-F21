import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';
import { Rating } from './Rating';


const ReviewSubList = props => {
    const userRepo = new UserRepository();
    const restRepo = new RestaurantRepository();
    const [reviews, setReviews] = useState(undefined);
    const [userContext, setUserContext] = useContext(UserContext);
    const [restaurant, setRestaurant] = useState("");



    useEffect(() => {
        restRepo.getRestaurant(props.rewiew.restaurantID).then(x => setRestaurant(x.data));
    }, []);


    if (!props.review) {
        return <>
            <div>Loading restarant...</div>
        </>
    }
    else {
        return (
            <>
                <Card>
                    <CardHeader > hello{ restaurant.restaurantName }</CardHeader>          
                        <div className="row justify-content-evenly">
                            <div className="text-rigth text-muted col-5"><Rating value = { props.review.rating}/></div>
                            <div className="text-end text-muted col-5">{ props.review.date}</div>
                        </div> 
                    <div className="m-3">{ props.review.body }</div>
                </Card>
            </>
        );
    }
};

export default ReviewSubList;
