import React, { useState } from "react"
import { menuItem } from "../models/menuItem";

export const AddMenu = props => {

    const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     onLoad();
    // }, []);

    // let onLoad = params => {
    //     setMenu(???.getMenu())
    // }

    const addItem = () => {
        let copyMenu = [...menu];
        copyMenu.push(new menuItem(" ", 0, " "))
        setMenu(copyMenu);
    }

    return <>
        <br />
        <br />
        <div className="container d-flex justify-content-center">
            <h1>Add or Edit your menu!</h1>
        </div>

        {
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
        }

        <div className="mx-auto d-flex justify-content-center">
            <button className="btn btn-secondary" onClick={() => addItem()}>Add Item</button>
            <br />
            <button className="btn btn-primary">Save Menu</button>
        </div>


    </>

}