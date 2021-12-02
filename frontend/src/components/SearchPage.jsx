import React from "react";
import { Dropdown, SplitButton } from "react-bootstrap";
import { Header } from "./Header";

import { useState, useEffect } from "react";

import RestaurantList from "./RestaurantList";
import { RestaurantRepository } from "../api/restaurantRepository";

import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export const SearchPage = props => {

    const [ restaurants, setRestaurants ] = useState(undefined);
    const [ searchFilter, setSearchFilter] = useState("Featured");
    const [ query, setQuery] = useState(undefined);

    const [ priceSlider, setPriceSlider] = useState([0, 100]);
    const [ ratingSlider, setRatingSlider] = useState([0, 5]);

    const restaurantRepo = new RestaurantRepository();

    useEffect(() => {
        onSearch();
    }, []);

    let onSearch = params => {
        if( searchFilter == "Featured"){
            restaurantRepo.getSponsoredRestaurants().then(x => setRestaurants(x.data));
        }
        if( searchFilter == "Show All"){
            restaurantRepo.getRestaurants().then(x => setRestaurants(x.data));
        }
        if( searchFilter == "Location"){
            restaurantRepo.getRestaurantByLocation(params).then(x => setRestaurants(x.data));
        } 
        if( searchFilter == "Cuisine Type"){
            restaurantRepo.getRestaurantByCuisineType(params).then(x => setRestaurants(x.data));
        }  
        if( searchFilter == "Meal Type"){
            restaurantRepo.getRestaurantByMealType(params).then(x => setRestaurants(x.data));
        }  
        if( searchFilter == "Average Rating"){
            restaurantRepo.getRestaurantByAvgRating(ratingSlider[0], ratingSlider[1]).then(x => setRestaurants(x.data));
        }
        if( searchFilter == "Average Price"){
            restaurantRepo.getRestaurantByAvgPrice(priceSlider[0], priceSlider[1]).then(x => setRestaurants(x.data));
        }
    }

    return <>
        <Header />
        <br/>
        <div className="card align-center w-75 mx-auto">
            <h2 className="card-header text-center">Search PopStop:</h2>
            
            <div className="input-group mx-auto p-3 w-100 align-middle">
                <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor:"rgb(173, 229, 233)"}} variant="outline-secondary" 
                                    id="dropdown-basic">
                        {searchFilter}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Show All")}>Show All</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Location")}>City</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Cuisine Type")}>Cuisine Type</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Meal Type")}>Meal Type</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Average Rating")}>Average Rating</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setSearchFilter("Average Price")}>Average Price</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <input type="text" className="form-control align-middle" placeholder="Search Term..."
                        onChange={(e) => setQuery(e.target.value)}/>

                <button className="btn btn-secondary h-25"
                        onClick={() => onSearch(query)}
                        style={{color: "gray", backgroundColor:"rgb(173, 229, 233)"}}> Search</button>
            </div>
            {
                searchFilter == "Average Price" && <div className="d-flex flex-row">
                    <span className="p-2 ml-3">Min Price: ${priceSlider[0]}</span>
                    <div className="w-50 mx-auto p-2">
                    <Range min={0} max={100} defaultValue={[0,100]} 
                            onChange={(value) => setPriceSlider(value)}/>
                    </div>
                    <span className="p-2 mr-3">Max Price: ${priceSlider[1]}</span>
                </div>
            }
            {
                searchFilter == "Average Rating" && <div className="d-flex flex-row">
                    <span className="p-2 ml-3">Min Rating: {ratingSlider[0]}</span>
                    <div className="w-50 mx-auto p-2">
                    <Range min={0} max={5} defaultValue={[0,5]} 
                            onChange={(value) => setRatingSlider(value)}/>
                    </div>
                    <span className="p-2 mr-3">Max Rating: {ratingSlider[1]}</span>
                </div>
            }
        </div>
        <RestaurantList restaurants = {restaurants} />
    </>
    

}