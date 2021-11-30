import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { MenuItemRepository } from "../api/menuItemRepository";
import { UserRepository } from "../api/userRespository";
import { menuItem } from "../models/menuItem";

export const AddMenu = props => {
    const userRepo = new UserRepository();
    const menuRepo = new MenuItemRepository();
    const [restID, setRestID] = useState(undefined);
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState(undefined);
    const [itemLink, setItemLink] = useState("");
    const [mealType, setMealType] = useState("");
    const [featured, setFeatured] = useState(0);
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("")

    useEffect(() => {
        setRestID(userRepo.currentUser().restaurantID);
        console.log(restID);
    }, []);


    const addAndClose = () => {
        let itemInfo = [restID, itemName, price, itemLink, mealType, 0, 0, featured, photo, description];
        menuRepo.addMenuItem(itemInfo);
    }

    const addAndContinue = () => {
        let itemInfo = [restID, itemName, price, itemLink, mealType, 0, 0, featured, photo, description];
        menuRepo.addMenuItem(itemInfo);
        setItemName("");
        setPrice("");
        setItemLink("");
        setMealType("");
        setDescription("");
        setFeatured(0);
        let inputs = document.getElementById('featuredCheck');
        inputs.checked = false;
    }
    return <>
        <br />
        <br />
        <div className="container d-flex justify-content-center">
            <h1>Add to your menu!</h1>
        </div>

        <div className="card mx-auto">
            <form className="form-group card-body p-2">
                <div className="row">

                    <div className="col-md-7">
                        <label htmlFor="name">Item Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}></input>
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="price">Item Price: $</label>
                        <input
                            id="price"
                            name="price"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}></input>
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="link">Item Link:</label>
                        <input
                            id="link"
                            name="link"
                            type="text"
                            value={itemLink}
                            onChange={(e) => setItemLink(e.target.value)}></input>
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="mealType">Meal Type:</label>
                        <input
                            id="mealType"
                            name="mealType"
                            type="text"
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}></input>
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="description">Description:</label>
                        <textarea value={description} id="description" name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="col-md-7">
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Featured Item
                            </label>
                            <input className="form-check-input" type="checkbox" value='1' id="featuredCheck" onChange={(e) => setFeatured(e.target.value)} />
                        </div>
                    </div>

                    <br />


                </div>

                <br />

                <div className="mx-auto d-flex justify-content-center row">
                    <Link className="btn btn-primary mx-auto col-md-5" to='/addMenu' onClick={addAndContinue}>Save Item</Link>
                    <br />
                    <Link className="btn btn-danger mx-auto col-md-5" to='/'>Exit</Link>
                </div>



            </form>
        </div>




    </>

}