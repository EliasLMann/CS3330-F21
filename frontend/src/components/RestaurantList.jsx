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
            <div className="container">
                <div className="ul row justify-content-center">
                    <div className="d-flex justify-content-center">
                        <h1>Featured Restaurants</h1>
                    </div>
                    {
                        props.restaurants.map((x, i) => <div className="card prod col-4 mx-auto" key={i}>
                            <div className="card-body mx-auto">
                                <div className="mx-4 d-flex justify-content-center">
                                    <h3>{x.restaurantName}</h3>
                                </div>
                                <div className="row d-flex justify-content-center">
                                <p className="col-6">City: {x.location}</p>
                                <p className="col-6">Cuisine: {x.cuisineType}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Link className="btn btn-primary details col-4 mx-auto my-auto col-9" to={`restaurants/${x.restaurantID}`}>Restaurant Details</Link>
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