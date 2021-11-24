import React, { useState } from "react"
import { menuItem } from "../models/menuItem";

export class AddMenu extends React.Component{

    state = {
        menu: []
    }

    // const [menu, setMenu] = useState(undefined);

    // useEffect(() => {
    //     onLoad();
    // }, []);

    // let onLoad = params => {
    //     setMenu(???.getMenu())
    // }

    addItem(){
        let copyMenu = [...this.state.menu];
        copyMenu.push(new menuItem(" ", 0, " "))
        this.setState({menu: copyMenu })
    }

    render(){
        return <>

            <h1>Add or Edit your menu!</h1> 

            {
                this.state.menu.map(menuItem => <div className="card w-75 mx-auto mb-3" key={menuItem.id}>
                    <span>Menu Item Name:</span>
                    <input type="text"></input>
                    <span>Menu Item Price:</span>
                    <input type="text"></input>
                    <span>Menu Item Description:</span>
                    <textarea></textarea>
                </div>)
            }

            <button className="btn btn-secondary mx-auto" onClick={() => this.addItem()}>Add Item</button>
            <br/>
            <button className="btn btn-primary">Save Menu</button>


        </>

    }
}