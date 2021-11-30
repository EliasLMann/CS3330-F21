import React, { useState } from "react"
import { menuItem } from "../models/menuItem";

export const AddMenu = props => {

    const [restID, setRestID] = useState(undefined);
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState(undefined);
    const [itemLink, setItemLink] = useState("");
    const [mealType, setMealType] = useState("");
    const [featured, setFeatured] = useState(0);
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("")
    const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     onLoad();
    // }, []);

    // let onLoad = params => {
    //     setMenu(???.getMenu())
    // }

    const addItem = () => {
        
    }

    return <>
        <br />
        <br />
        <div className="container d-flex justify-content-center">
            <h1>Add or Edit your menu!</h1>
        </div>

        <div className="card">
        <form className="form-group card-body p-2">
                    <div className="row">

                        <div className="col-md-7">
                            <label>Menu Item Name:</label>
                            <input type="text"></input>
                        </div>
                        <div className="col-md-5">
                            <label>Menu Item Price: $</label>
                            <input className="w-25" type="text"></input>
                        </div>

                    </div>

                    <br />

                    <div className="d-flex">
                        <label className="text-center">Menu Item Description:</label>
                        <textarea className="w-75 form-control"></textarea>
                    </div>

                </form>
        </div>

        {/* {
            menu.map((menuItem, i) => <div className="card w-75 mx-auto mb-3" key={i}>
                <span className="card-header">Menu Item #{i}</span>

                <form className="form-group card-body p-2">
                    <div className="row">

                        <div className="col-md-7">
                            <label>Menu Item Name:</label>
                            <input type="text"></input>
                        </div>
                        <div className="col-md-5">
                            <label>Menu Item Price: $</label>
                            <input className="w-25" type="text"></input>
                        </div>

                    </div>

                    <br />

                    <div className="d-flex">
                        <label className="text-center">Menu Item Description:</label>
                        <textarea className="w-75 form-control"></textarea>
                    </div>

                </form>

            </div>)
        } */}

        <div className="mx-auto d-flex justify-content-center">
            <button className="btn btn-secondary" onClick={() => addItem()}>Save and Add Another Item</button>
            <br />
            <button className="btn btn-primary">Save Item and Finish</button>
        </div>


    </>

}