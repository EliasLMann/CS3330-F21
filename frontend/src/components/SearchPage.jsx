import React from "react";
import { Dropdown } from "react-bootstrap";
import { Header } from "./Header";

import { useState, useEffect } from "react";

import { UserRepository } from "../api/userRespository";
import { RestaurantList } from "./RestaurantList";

export const SearchPage = props => {

    const [ restaurants, setRestaurants ] = useState(undefined);
    const [ searchFilter, setSearchFilter] = useState("Search By...");

    const userRepo = new UserRepository();

    useEffect(() => {
        onSearch();
    }, []);

    let onSearch = params => {
        userRepo.getRestaurants().then(x => setRestaurants(x));
    }

    return <>

        <div className="card align-center w-75 mx-auto">
            <h2 className="card-header text-center">Search PopStop:</h2>
            
            <div class="input-group mx-auto p-3 w-100 align-middle">
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
                <input type="text" class="form-control align-middle" placeholder="Find your next destination..."/>
                <button className="btn btn-secondary h-25">Search</button>
            </div>
        </div>
        <RestaurantList restaurants = {restaurants} />
    </>
    

}