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
        else{
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
    <div className="d-flex flex-row justify-content-center">
        
        <Card className="p-2 mx-l" style={{ width: '75%' }}>
            <Card.Body>
                <Card.Title className="text-rigth h1">Your Reviews ({!reviews.length ? 0 : reviews.length})</Card.Title>
                    <ul className="d-grid gap-3 mb-3 p-3 mx-auto" style={{ width: '100%' }}>
                        {
                            !reviews.length && <Card className="p-2 bg-light mb-1"> You have not left any reviews yet  </Card>
                        }
                        {
                            reviews.map((x, i) => <Card key={ i }>
                        {    
                            !userRepo.currentUser().restaurantID ? 
                                <CardHeader > { x.restaurantID }</CardHeader> : 
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
            </Card>
        </div>
   </>
    );
    }
};
