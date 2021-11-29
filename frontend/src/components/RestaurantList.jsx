import React, { setState, useEffect, useState } from 'react';
import { RestaurantRepository } from '../api/restaurantRepository';

const RestaurantList = () => {
    const restRepo = new RestaurantRepository();
    const [restaurants, setRestaurants] = useState(undefined);

    useEffect(() => {
        restRepo.getRestaurants().then(x => setRestaurants(x));
        console.log(restaurants);
    }, [])

    if (!restaurants) {
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
                {console.log(restaurants)}
                {
                        restaurants.data.map((x, i) => <div className="card prod col-4" key={i}>
                            <div className="card-body row">
                                <h3>{x.restaurantName}</h3>
                                <p>{x.location}</p>
                                <p>{x.cuisineType}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </>
    }
}
export default RestaurantList;