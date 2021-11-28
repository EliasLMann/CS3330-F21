import React from "react";
import { RestaurantOwnerForm } from "./RestaurantOwnerForm";

import './registerPage.css';
import { UserRepository } from "../api/userRespository";
import { Header } from "./Header";

export class RegisterPage extends React.Component {

    userRepo = new UserRepository();

    accountType = [
        " ",
        "Restaurant Owner",
        "Customer"
    ]
    state = {
        email: "",
        userName: "",
        password:"",
        redoPassword: "",
        accountType: "",

        passwordMatch:true,
        canRegister:false,

        restaurantData:[]
    }


    onSubmitClick(){
        if(this.accountType === "Restaurant Owner"){
            this.userRepo.addRestaurant(this.restaurantData);
            this.userRepo.addUser(this.state.userName, this.state.password, this.state.accountType)

        } else {
            this.userRepo.addUser(this.state.userName, this.state.password, this.state.accountType)

        }
    }

    getRestaurantData = (newRestaurantData) => {
        this.setState({restaurantData: newRestaurantData})
    }


    render(){

        return<>
        <Header/>
            <div className="card mt-5 w-75 mx-auto justify-content-center align-items-center">

            <h1 className="card-header w-100 pt-2 text-center align-center">Register</h1>

            <form id="registerForm"className="card-body text-center">
                <label for="email">Enter your email: </label>
                <input 
                    type="text" id="email" name="email"
                    value={this.state.email}
                    onChange={event => this.setState({email: event.target.value})}
                >
                </input>

                <br/>

                <label for="userName">Username: </label>
                <input 
                    type="text" id="userName" name="userName"
                    value={this.state.userName}
                    onChange={event => this.setState({userName: event.target.value})}
                >
                </input>

                <br/>

                <label for="password">Password: </label>
                <input 
                    type="password" id="password" name="password"
                    value={this.state.password}
                    onChange={event => this.setState({password: event.target.value})}
                >
                </input>

                <br/>

                <label for="redoPassword">Verify password: </label>
                <input 
                    type="password" id="redoPassword" name="redoPassword"
                    value={this.state.redoPassword}
                    onChange={event => this.setState({redoPassword: event.target.value})}
                >
                </input>

                <br/>

                {
                    (this.state.redoPassword !== "" && (this.state.password !== this.state.redoPassword)) &&
                    <div className="card">
                        <span className="text-danger">Passwords do NOT match!</span>
                    </div>
                }

                <br/>

                <label for="accountType">I am a...</label>
                <select 
                    name="accountType" id="accountType"
                    value={this.state.accountType}
                    onChange={event => this.setState({ accountType: event.target.value })}
                >
                        {
                            this.accountType.map((x, i) =>
                                <option key = {i} > {x}</option>)
                        }
                </select>

                <br/>

                {
                    this.state.accountType === "Restaurant Owner" && <RestaurantOwnerForm getRestaurantData={this.getRestaurantData}/>
                }

                <br/>

                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={ () => this.onSubmitClick() }>Submit</button>

            </form>

            </div>
        
        </>;
    }
}