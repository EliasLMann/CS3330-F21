import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';
import { RestaurantOwnerForm } from './RestaurantOwnerForm';
import { Header } from './Header';
import { Landing } from './Landing';
import { Popover, OverlayTrigger } from 'react-bootstrap';


const OwnerInfo = () => {
    const [restaurantName, setRestaurantName] = useState("");
    const [cuisineType, setCuisineType] = useState("");
    const [addressStreet, setAddressStreet] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressZip, setAddressZip] = useState("");
    const [openTimes, setOpenTimes] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [websiteURL, setWebsiteURL] = useState("");
    const [instagramUser, setInstagramUser] = useState("");



    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);
    const history = useHistory();
    const userRepository = new UserRepository();

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

    }


    useEffect(() => {
        const user = userContext;
        if (user.username) {
            console.log(user);
            history.push('/');
        }
    });


    return <>
        <Header />
        <form className="container card form-group" onSubmit={addRest}>
            <h2 className="card-header">About your restaurant</h2>
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
            </div>

            <br />

            <div className="mx-auto form-group">
                <label htmlFor="restaurantAddress">Restaurant Address: </label>
            </div>
            <div className="d-flex flex-row justify-content-center p-2">
                <input type="text" id="addressStreet" name="addressStreet"
                    value={addressStreet}
                    onChange={(e) => setAddressStreet(e.target.value)}
                    className="form-control w-75 formControl"
                    placeholder="Street Name"
                ></input>
                <input type="text" id="addressCity" name="addressCity"
                    value={addressCity}
                    onChange={(e) => setAddressCity(e.target.value)}
                    className="form-control w-25"
                    placeholder="City"
                ></input>
                <input type="text" id="addressState" name="addressState"
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                    className="form-control w-25"
                    placeholder="State"
                ></input>
                <input type="text" id="addressZip" name="addressZip"
                    value={addressZip}
                    onChange={(e) => setAddressZip(e.target.value)}
                    className="form-control w-25"
                    placeholder="Zip Code"
                ></input>
            </div>

            <br />

            <span className="mb-2">Open Times:</span>
            <div>
                <textarea className="mx-auto w-25 h-100"
                    onChange={(e) => setOpenTimes(e.target.value)}></textarea>
                <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
                    <Button className="mx-auto rounded-circle" > ? </Button>
                </OverlayTrigger>
            </div>

            <br />

            <span className="mb-2">Restaurant Description</span>
            <div>
                <textarea className="mx-auto w-50 h-100 formControl"
                    onChange={(e) => setRestaurantDescription(e.target.value)}></textarea>
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
            <br />
        </form>
    </>
}

export default OwnerInfo;