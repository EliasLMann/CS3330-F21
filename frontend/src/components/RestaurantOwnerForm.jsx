import React from "react";
import { useState } from "react";

import "./registerPage.css";

import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


const popoverRight = (
    <Popover className="p-1" id="popover-positioned-right" title="Popover right">
        <strong>Ex:</strong> <br />
        Monday: 10AM-10PM <br />
        Tuesday: 10AM-10PM <br />
        Wednesday: Closed <br />
        etc.
    </Popover>
);


export const RestaurantOwnerForm = props =>{

    const [restaurantName, setrestaurantName] = useState("");
    const [cuisineType, setcuisineType] = useState("");

    const [addressStreet, setaddressStreet] = useState("");
    const [addressCity, setaddressCity] = useState("");
    const [addressState, setaddressState] = useState("");
    const [addressZip, setaddressZip] = useState("");

    const [openTimes, setopenTimes] = useState("");
    const [restaurantDescription, setrestaurantDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [instagramUser, setinstagramUser] = useState("");

    const [restaurantData, setRestaurantData] = useState([]);

    const onTrigger = () => {
        setRestaurantData([restaurantName, cuisineType, 
            addressStreet, addressCity, addressState, addressZip, 
            openTimes, restaurantDescription, website, instagramUser]);

        props.getRestaurantData(restaurantData);
    };


    const hours = [
        "12AM", "1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM",
        "12PM","1PM","2PM",'3PM',"4PM",'5PM','6PM','7PM','8PM','9PM',"10PM","11PM"
    ]

    return<>
        <form className="card form-group">
            <h2 className="card-header">About your restaurant</h2>
            <br/>
            <div className="d-flex flex-row justify-content-center align-middle">
                <label className="align-middle"for="restaurantName">Restaurant Name: </label>
                <input 
                    type="text" id="restaurantName" name="restaurantName"
                    value={restaurantName}
                    className="formControl"
                    onChange={event => setrestaurantName(event.target.value)}
                >
                </input>

                <label className="align-middle"for="cuisineType">Cuisine Type: </label>
                <input 
                    type="text" id="cuisineType" name="cuisineType"
                    value={cuisineType}
                    className="formControl"
                    onChange={event => setcuisineType(event.target.value)}
                >
                </input>
            </div>

            <br/>

            <div className="mx-auto form-group">
                <label for="restaurantAddress">Restaurant Address: </label>
            </div>
            <div className="d-flex flex-row justify-content-center p-2">
                <input type="text" id="addressStreet" name="addressStreet"
                        value={addressStreet}
                        onChange={event => setaddressStreet(event.target.value)}
                        className="form-control w-75 formControl"
                        placeholder="Street Name"
                ></input>
                <input type="text" id="addressCity" name="addressCity"
                        value={addressCity}
                        onChange={event => setaddressCity(event.target.value)}
                        className="form-control w-25"
                        placeholder="City"
                ></input>
                <input type="text" id="addressState" name="addressState"
                        value={addressState}
                        onChange={event => setaddressState(event.target.value)}
                        className="form-control w-25"
                        placeholder="State"
                ></input>
                <input type="text" id="addressZip" name="addressZip"
                        value={addressZip}
                        onChange={event => setaddressZip(event.target.value)}
                        className="form-control w-25"
                        placeholder="Zip Code"
                ></input>
            </div>

            <br/>

            <span className="mb-2">Open Times:</span>
            <div>
                <textarea class="mx-auto w-25 h-100"
                            onChange={event => setopenTimes(event.target.value)}></textarea>
                <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
                    <Button className="mx-auto rounded-circle" > ? </Button>
                </OverlayTrigger>
            </div>

            <br/>

            <span className="mb-2">Restaurant Description</span>
            <div>
                <textarea class="mx-auto w-50 h-100 formControl"
                            onChange={event => setrestaurantDescription(event.target.value)}></textarea>
            </div>

            <br/>

            <div className="w-75 mx-auto">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Website:</span>
                    </div>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"
                            onChange={event => setWebsite(event.target.value)}/>
                </div> 
            </div>
            <div className="w-75 mx-auto">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Instagram @:</span>
                    </div>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"
                            onChange={event => setinstagramUser(event.target.value)}/>
                </div> 
            </div>

            <button type="button" class="btn btn-outline-secondary w-25 mx-auto" onClick = {() => onTrigger()}> Save Restaurant Details</button>
            <br/>
        </form>
    </>
}