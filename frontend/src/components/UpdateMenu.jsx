import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { MenuItemRepository } from "../api/menuItemRepository";
import { UserRepository } from "../api/userRespository";
import { menuItem } from "../models/menuItem";
import { Header } from "./Header";
import { useParams } from 'react-router';

export const UpdateMenu = () => {
    const userRepo = new UserRepository();
    const menuRepo = new MenuItemRepository();
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState(undefined);
    const [itemLink, setItemLink] = useState("");
    const [mealType, setMealType] = useState("");
    const [featured, setFeatured] = useState(0);
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const [oldItem, setOldItem] = useState(undefined);
    const { itemID } = useParams();

    useEffect(() => {
        console.log(itemID);
        menuRepo.getItem(itemID).then(x => setOldItem(x.data[0]));
        menuRepo.getItem(itemID).then(x => setItemName(x.data[0].itemName));
        menuRepo.getItem(itemID).then(x => setPrice(x.data[0].price));
        menuRepo.getItem(itemID).then(x => setMealType(x.data[0].mealType));
        menuRepo.getItem(itemID).then(x => setDescription(x.data[0].description));
        setFeatured(0);
        
    }, []);

    const save = () => {
        let itemInfo = [itemID, itemName, price, itemLink, mealType, oldItem.likes, oldItem.dislikes, featured, photo, description];
        menuRepo.updateItem(itemInfo);
    }

    if (!oldItem) {
        return (<div>Loading</div>)
    }
    else {
    return <>
        <Header/>
        <br />
        <br />
        <div className="container d-flex justify-content-center">
            <h1>Menu Editor</h1>
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
                            placeholder={oldItem.itemName}
                            onChange={(e) => setItemName(e.target.value)}></input>
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="price">Item Price: $</label>
                        <input
                            id="price"
                            name="price"
                            type="text"
                            placeholder={oldItem.price}
                            onChange={(e) => setPrice(e.target.value)}></input>
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="mealType">Meal Type:</label>
                        <input
                            id="mealType"
                            name="mealType"
                            type="text"
                            placeholder={oldItem.mealType}
                            onChange={(e) => setMealType(e.target.value)}></input>
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="description">Description:</label>
                        <textarea placeholder={oldItem.description} id="description" name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
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
                    <Link className="btn btn-primary mx-auto col-md-5" to='/profile' onClick={save}>Save Item</Link>
                    <br />
                </div>



            </form>
        </div>




    </>
    }

}