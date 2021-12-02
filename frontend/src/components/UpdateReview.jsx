import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { RestaurantRepository } from '../api/restaurantRepository';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';
import { Rating } from './Rating';
import ReviewHeaderUsername from './ReviewHeaderUsername';


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
            <div className="container mb-5">   
                <Card className="p-2 mx-l">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-center h1">Your Reviews ({!reviews.length ? 0 : reviews.length})</Card.Title>
                            <ul className="d-grid gap-3 mb-3 p-3 mx-auto" style={{ width: '100%' }}>
                                {
                                    !reviews.length && <Card className="p-2 bg-light mb-1"> You have not left any reviews yet  </Card>
                                }
                                {
                                    reviews.map((x, i) => <Card key={i}>
                                        <CardHeader className="d-flex"> 
                                            <ReviewHeaderUsername className="p-2 flex-grow-1" review = {x}/>
                                            {/* {
                                                (x.sponsored == 0) ? <button className="p-2">Sponsor Review</button> : <p className="p-2">This is a sponsored review</p>
                                            } */}
                                            </CardHeader>
                                        <div className="d-flex">
                                            <div className="p-2 flex-grow-1 text-muted"><Rating value={x.rating} /></div>
                                            <div className="p-2 text-muted">{x.date.substring(0,9)}</div>
                                        </div>
                                        <div className="m-3">"{x.body}"</div>
                                    </Card>)
                                }
                            </ul>
                        </Card.Body>
                    </Card>
                    </div>
            </>
        );
    }
};

