import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';
import { RestaurantOwnerForm } from './RestaurantOwnerForm';
import { Header } from './Header';
import { Landing } from './Landing';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { RestaurantRepository } from '../api/restaurantRepository';


const OwnerInfo = () => {
    const [restaurantName, setRestaurantName] = useState("");
    const [cuisineType, setCuisineType] = useState("");
    const [location, setLocation] = useState("")
    const [openTimes, setOpenTimes] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [sponsored, setSponsored] = useState(0);
    const [websiteURL, setWebsiteURL] = useState("");
    const [instagramUser, setInstagramUser] = useState("");
    const [socialMediaURL, setSocialMediaURL] = useState("");



    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);
    const history = useHistory();
    const userRepository = new UserRepository();
    const restRepo = new RestaurantRepository();

    const popoverRight = (
        <Popover className="p-1" id="popover-positioned-right" title="Popover right">
            <strong>Ex:</strong> <br />
            Monday: 10AM-10PM <br />
            Tuesday: 10AM-10PM <br />
            Wednesday: Closed <br />
            etc.
        </Popover>
    );

    const addRest = () => {
        let restInfo = [restaurantName, location, openTimes, restaurantDescription, cuisineType, websiteURL, sponsored, instagramUser, socialMediaURL];
        restRepo.addRestaurant(restInfo);
    }


    useEffect(() => {
        // console.log(sponsored);
        // console.log(restaurantName)
    });


    return <>
        <Header />
        <form className="container card form-group" onSubmit={addRest}>
            <br/>
            <div className="d-flex justify-content-center">
                <h2 className="title mx-auto">About your restaurant</h2>
            </div>
            <br />
            <div className="d-flex flex-row justify-content-center align-middle">
                <label className="align-middle" htmlFor="restaurantName">Restaurant Name: </label>
                <input
                    type="text" id="restaurantName" name="restaurantName"
                    value={restaurantName}
                    className="formControl"
                    onChange={(e) => setRestaurantName(e.target.value)}                >
                </input>

                <label className="align-middle" htmlFor="cuisineType">Cuisine Type: </label>
                <input
                    type="text" id="cuisineType" name="cuisineType"
                    value={cuisineType}
                    className="formControl"
                    onChange={(e) => setCuisineType(e.target.value)}
                >
                </input>
                <label className="align-middle" htmlFor="location">City: </label>
                <input
                    type="text" id="location" name="location"
                    value={location}
                    className="formControl"
                    onChange={(e) => setLocation(e.target.value)}
                >
                </input>
            </div>

            <br />
            <div className="d-flex justify-content-center">
                <span className="mb-2">Open Times:</span>
                <div>
                    <textarea className="mx-auto w-25 h-100"
                        onChange={(e) => setOpenTimes(e.target.value)}></textarea>
                    <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
                        <Button className="mx-auto rounded-circle" > ? </Button>
                    </OverlayTrigger>
                </div>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <span className="mb-2">Restaurant Description</span>
                <div>
                    <textarea className="mx-auto w-50 h-100 formControl"
                        onChange={(e) => setRestaurantDescription(e.target.value)}></textarea>
                </div>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value='1' id="flexCheckDefault" onChange={(e) => setSponsored(e.target.value)}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Sponsored
                    </label>
                </div>
            </div>

            <br />
            <div className="w-75 mx-auto">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Website:</span>
                    </div>
                    <input type="text" className="form-control" aria-describedby="basic-addon3"
                        onChange={(e) => setWebsiteURL(e.target.value)} />
                </div>
            </div>
            <div className="w-75 mx-auto">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Instagram @:</span>
                    </div>
                    <input type="text" className="form-control" aria-describedby="basic-addon3"
                        onChange={(e) => setInstagramUser(e.target.value)} />
                </div>
            </div>
            <div className="w-75 mx-auto">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Social Media Link:</span>
                    </div>
                    <input type="text" className="form-control" aria-describedby="basic-addon3"
                        onChange={(e) => setSocialMediaURL(e.target.value)} />
                </div>
            </div>
            <br />

            <button type="button" className="btn" onClick={addRest}>Submit</button>
        </form>
    </>
}

export default OwnerInfo;