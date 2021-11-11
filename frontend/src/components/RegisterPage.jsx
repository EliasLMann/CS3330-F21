import React from "react";
import { RestaurantOwnerForm } from "./RestaurantOwnerForm";

import './registerPage.css';

export class RegisterPage extends React.Component {

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
    }


    onSubmitClick(){

    }


    render(){

        return<>
            <div class="card">

            <h1 class="card-title">Register</h1>

            <form id="registerForm"class="card-body"
                    oninput='redoPassword.setCustomValidity(redoPassword.value != password.value ? "Passwords do not match." : "")'>
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
                    type="text" id="password" name="password"
                    value={this.state.password}
                    onChange={event => this.setState({password: event.target.value})}
                >
                </input>

                <br/>

                <label for="redoPassword">Verify password: </label>
                <input 
                    type="text" id="redoPassword" name="redoPassword"
                    value={this.state.redoPassword}
                    onChange={event => this.setState({redoPassword: event.target.value})}
                >
                </input>

                <br/>

                {
                    (this.state.redoPassword !== "" && (this.state.password !== this.state.redoPassword)) &&
                    <div className="card">
                        <span>Passwords do NOT match!</span>
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
                    this.state.accountType === "Restaurant Owner" && <RestaurantOwnerForm />
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