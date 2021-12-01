import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import { UserRepository } from '../api/userRespository';
import { Header } from './Header';
import { RestaurantRepository } from '../api/restaurantRepository';
import { Link } from 'react-router-dom';
import { MenuItemRepository } from '../api/menuItemRepository';


import { ReviewList } from './ReviewList';

const CustomerView = () => {
    const userRepo = new UserRepository();
    const [userContext, setUserContext] = useContext(UserContext);

    useEffect(() => {
        const user = userContext;
        let userID = userRepo.currentUser().userID;
        setUserContext(userRepo.currentUser());

        
        console.log("userID: " + userContext.userId)
    }, []);

    return (
        <>
            <Header />
            <ReviewList/>

        </>
    )
}

const RestaurantView = () => {
    const restRepo = new RestaurantRepository();
    const userRepo = new UserRepository();
    const itemRepo = new MenuItemRepository();
    const [restaurant, setRestaurant] = useState(undefined);
    const [menu, setMenu] = useState(undefined);

    const deleteItem = async (itemID) => {
        console.log(itemID);
    }

    useEffect(() => {
        let restID = userRepo.currentUser().restaurantID;
        restRepo.getRestaurant(restID).then(x => setRestaurant(x.data[0]));
        restRepo.getMenuItems(restID).then(x => setMenu(x.data));
        console.log(restaurant)
    }, []);

    if (!restaurant || !menu) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <>
                <Header />
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <h1>{restaurant.restaurantName}</h1>
                    </div>
                    <div className="card d-flex flex-column">
                        <p className="p-2">Location: {restaurant.location}</p>
                        <p className="p-2">Hours: {restaurant.hours}</p>
                        <p className="p-2">Cuisine Type: {restaurant.cuisineType}</p>
                    </div>



                    <div className="card mx-auto">

                        <div className="d-flex justify-content-center">
                            <h2>My Menu</h2>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Meal Type</th>
                                    <th>Likes</th>
                                    <th>Dislikes</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    menu.map((x, i) =>
                                        <tr key={i}>
                                            <th className="fw-normal">{x.itemName}</th>
                                            <th className="fw-normal">${x.price}</th>
                                            <th className="fw-normal">{x.description}</th>
                                            <th className="fw-normal">{x.mealType}</th>
                                            <th className="fw-normal">
                                                <button type="submit" className="btn btn-success mx-auto" > {x.likes} </button>
                                            </th>
                                            <th className="fw-normal">
                                                <button className="btn btn-danger mx-auto"> {x.dislikes} </button>
                                            </th>
                                            <th className="fw-normal">
                                                <Link className="btn btn-primary mx-auto" to={`updateMenu/${x.itemID}`}>Edit Item</Link>
                                            </th>
                                            <th className="fw-normal">
                                                <button className="btn btn-danger mx-auto" onClick={() => itemRepo.deleteItem(x.itemID)}> Delete </button>
                                            </th>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            <Link to="/addMenu" className="fw-bolder col-4 btn btn-primary mx-auto">Add More Items</Link>
                        </div>
                        <br/>
                    </div>
                </div>
                <ReviewList/>
            </>
        )
    }
}




export const Profile = () => {
    const userRepo = new UserRepository();
    const [restaurantOwner, setRestaurantOwner] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);

    useEffect(() => {

        if (userRepo.currentUser().restaurantID !== null) {
            setRestaurantOwner(true);
        }
    }, []);

    return restaurantOwner ? <RestaurantView /> : <CustomerView />;
}