import React from "react";
import { Dropdown } from "react-bootstrap";
import { Header } from "./Header";

import { useState, useEffect } from "react";

import RestaurantList from "./RestaurantList";
import { RestaurantRepository } from "../api/restaurantRepository";

export const SearchPage = props => {

    const [ restaurants, setRestaurants ] = useState(undefined);
    const [ searchFilter, setSearchFilter] = useState("Show All");
    const [ query, setQuery] = useState(undefined);

    const restaurantRepo = new RestaurantRepository();

    useEffect(() => {
        onSearch();
    }, []);

    let onSearch = params => {
        if( searchFilter == "Show All"){
            restaurantRepo.getRestaurants().then(x => setRestaurants(x));
        }
        if( searchFilter == "Cuisine Type"){
            restaurantRepo.getRestaurantByCuisineType(params).then(x => setRestaurants(x));
        }  
    }

    return <>
        <Header />
        <div className="card align-center w-75 mx-auto">
            <h2 className="card-header text-center">Search PopStop:</h2>
            
            <div className="input-group mx-auto p-3 w-100 align-middle">
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                        {searchFilter}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Show All")}>Show All</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Average Price")}>Average Price</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Cuisine Type")}>Cuisine Type</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Location")}>Location</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Distance")}>Distance</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Zip Code")}>Zip Code</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <input type="text" className="form-control align-middle" placeholder="Find your next destination..."
                        onChange={(e) => setQuery(e.target.value)}/>
                <button className="btn btn-secondary h-25"
                        onClick={() => onSearch(query)}> Search</button>
            </div>
        </div>
        <RestaurantList restaurants = {restaurants} />
    </>
    

}