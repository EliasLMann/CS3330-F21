import React from "react";
import { RestaurantOwnerForm } from "./RestaurantOwnerForm";

export class RegisterPage extends React.Component {

    accountType = [
        " ",
        "Restaurant Owner",
        "Customer"
    ]
    state = {
        email: "",
        name: "",
        password:"",
        redoPassword: "",
<<<<<<< Updated upstream
        accountType: ""
=======
        accountType: "",
>>>>>>> Stashed changes
    }


    onSubmitClick(){

    }


    render(){

        return<>
        
            <h1>Register</h1>

            <form>
                <label for="email">Email</label>
                <input 
                    type="text" id="email" name="email"
                    value={this.state.email}
                    onChange={event => this.setState({email: event.target.value})}
                >
                </input>

                <br/>

                <label for="userName">Username</label>
                <input 
                    type="text" id="userName" name="userName"
                    value={this.state.userName}
                    onChange={event => this.setState({userName: event.target.value})}
                >
                </input>

                <br/>

                <label for="password">Password</label>
                <input 
                    type="text" id="password" name="password"
                    value={this.state.password}
                    onChange={event => this.setState({password: event.target.value})}
                >
                </input>

                <br/>

                <label for="redoPassword">Password Again</label>
                <input 
                    type="text" id="redoPassword" name="redoPassword"
                    value={this.state.redoPassword}
                    onChange={event => this.setState({redoPassword: event.target.value})}
                >
                </input>

                <br/>

                <label for="accountType">I am a...</label>
                <select 
                    name="accountType" id="accountType"
<<<<<<< Updated upstream
                    value={this.state.accountType}
                    onChange={event => this.setState({ accountType: event.target.value })}
=======
                    value={this.state.type}
                    onChange={event => this.setState({accountType: event.target.value})}
>>>>>>> Stashed changes
                >
                        {
                            this.accountType.map((x, i) =>
                                <option key = {i} > {x}</option>)
                        }
                </select>

                <br/>

                <button
                    type="button"
                    onClick={ () => this.onSubmitClick() }>Submit</button>
            </form>

            {
<<<<<<< Updated upstream
                this.state.accountType == "Restaurant Owner" && <RestaurantOwnerForm />
=======
                (this.state.accountType == "Customer") && <h1>USER</h1>
>>>>>>> Stashed changes
            }
        
        </>;
    }
}