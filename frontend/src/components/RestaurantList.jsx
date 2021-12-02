import React, { setState, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantRepository } from '../api/restaurantRepository';

const RestaurantList = (props) => {
    
    if (!props.restaurants) {
        return <>
            <div>
                Restaurants Loading...
            </div>
        </>
    }
    else {
        return <>
            <div className="container card mt-3 opaque-back">
                <div className="ul row justify-content-center transparent-back">
                    {/* <div className="d-flex justify-content-center">
                        <h1 className="cardHeader mt-3">Featured Restaurants</h1>
                    </div> */}
                    {
                        props.restaurants.map((x, i) => <div className="card prod col-4 mx-auto my-2" key={i}>
                            <div className="card-body mx-auto">
                                <div className="mx-4 d-flex justify-content-center">
                                    <h3>{x.restaurantName}</h3>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="p-2 mr-auto">
                                        <i className="fas fa-map-marker-alt text-danger mr-1" style={{ fontSize: 25 }}>: </i>
                                        <span style={{ fontSize: 20 }}>{x.location}</span>
                                    </div>
                                    <div className="p-2 ml-auto">
                                        <i className="fa fa-utensils mr-1" style={{ fontSize: 25, color: 'rgb(173, 229, 233)'}}>: </i>
                                        <span style={{ fontSize: 20 }}>{x.cuisineType}</span>
                                    </div>            
                                </div>
                            </div>
                            <div className="d-flex justify-content-center text-black">
                                <Link className="btn btn-outline-secondary details col-4 mx-auto my-auto col-9" 
                                        to={`restaurants/${x.restaurantID}`}
                                        >Restaurant Details</Link>
                            </div>
                            <br/>
                        </div>)

                    }
                </div>
            </div>
        </>
    }
}
export default RestaurantList;