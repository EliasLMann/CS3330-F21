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
    const [postInfo, setPostInfo] = useState(undefined);


    const [restID, setRestID] = useState(undefined);

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
        restRepo.getRestID().then(x => setRestID(x.data.id));
        userRepository.linkUserRestaurant(userRepository.currentUser().userID, restID);
        // console.log(userRepository.currentUser().restaurantID);
        if(userRepository.currentUser().restaurantID === null) {
            userRepository.updateSession(userRepository.currentUser().username);
        }
        document.getElementById("restForm").visiblity="none";
    }


    useEffect(() => {
        userRepository.updateSession(userRepository.currentUser().username);
        restRepo.getRestID().then(x => setRestID(x.data[0].id));
        setRestID(restID);
        console.log(restID);
        console.log(userRepository.currentUser());
    }, []);


    return <>
        <Header />
        <div className="d-flex flex-row justify-content-center">
        <Card className=" mt-2 mx-l w-75">
        <CardHeader className="h2 mx-auto text-center w-100"> About your restaurant</CardHeader>
        <form id="restForm" className=" row g-3 " >
            <br/>
            <div className="d-flex justify-content-center">
                <h2 className="title mx-auto">About your restaurant</h2>
            </div>
            <br />
            
            <div >
                <label className="col-sm-2 col-form-label w-50" htmlFor="restaurantName">Restaurant Name: </label>
                <input
                    type="text" id="restaurantName" name="restaurantName"
                    value={restaurantName}
                    className="formControl w-25"
                    onChange={(e) => setRestaurantName(e.target.value)}                >
                </input>

            
            <div>
                <label className="col-sm-2 col-form-label w-50" htmlFor="cuisineType">Cuisine Type: </label>
                <input
                    type="text" id="cuisineType" name="cuisineType"
                    value={cuisineType}
                    className="formControl w-25"
                    onChange={(e) => setCuisineType(e.target.value)}
                >
                </input>
            </div>


            <div>
                <label className="col-sm-2 col-form-label w-50" htmlFor="location">City: </label>
                <input
                    type="text" id="location" name="location"
                    value={location}
                    className="formControl w-25"
                    onChange={(e) => setLocation(e.target.value)}
                >
                </input>
            </div>

            <br />
            <div className="w-100 mx-auto text-center ">
                <div className="">
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
                <div className="mx-auto">
                    <span className="mb-2">Restaurant Description</span>
                    <div>
                        <textarea className="mx-auto w-50 h-100 formControl"
                            onChange={(e) => setRestaurantDescription(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <br />
            
            <div className="mx-auto align-center text-center">
            <div className="col-12">
                    <div className="">
                        <input className="form-check-input float-none" type="checkbox" value='1' id="flexCheckDefault" onChange={(e) => setSponsored(e.target.value)} />
                        <label className="form-check-label float-none" htmlFor="flexCheckDefault">
                            Sponsored
                        </label>
                    </div>
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
        
            <button type="button" className="btn btn-primary mx-auto" onClick={addRest}>Submit</button>
        </form>
        <div className="container">
        <Link className="btn btn-success" to='/addMenu'>Continue</Link>
        </div>
        </div>
    </>
}

export default OwnerInfo;