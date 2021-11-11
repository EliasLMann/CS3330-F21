import React from "react";

import "./registerPage.css";

export class RestaurantOwnerForm extends React.Component {

    state = {
        restaurantName:"",
        restaurantAddress:"",
    }

    render(){

        return<>
            <form>
                <h2>About your restaurant</h2>

                <label for="restaurantName">Restaurant Name: </label>
                <input 
                    type="text" id="restaurantName" name="restaurantName"
                    value={this.state.restaurantName}
                    onChange={event => this.setState({restaurantName: event.target.value})}
                >
                </input>

                <br/>

                <label for="restaurantAddress">Restaurant Address: </label>
                <textarea 
                    type="text" id="restaurantAddress" name="restaurantAddress"
                    value={this.state.restaurantAddress}
                    onChange={event => this.setState({restaurantAddress: event.target.value})}
                >
                </textarea>

                <div class="openTimes card flex-row">
                    <span class="card-header">When are you open?</span>

                    <div class="">
                        <label for="Sunday"> Sunday </label>
                        <input type="checkbox" id="Sunday" name="Sunday" value="Sunday"/>
                        <label for="Monday"> Monday </label>
                        <input type="checkbox" id="Monday" name="Monday" value="Monday"/>
                        <label for="Tuesday"> Tuesday </label>
                        <input type="checkbox" id="Tuesday" name="Tuesday" value="Tuesday"/>
                        <label for="Wednesday"> Wednesday </label>
                        <input type="checkbox" id="Wednesday" name="Wednesday" value="Wednesday"/>
                        <label for="Thursday"> Thursday </label>
                        <input type="checkbox" id="Thursday" name="Thursday" value="Thursday"/>
                        <label for="Friday"> Friday </label>
                        <input type="checkbox" id="Friday" name="Friday" value="Friday"/>
                        <label for="Saturday"> Saturday </label>
                        <input type="checkbox" id="Saturday" name="Saturday" value="Saturday"/>
                    </div>
                </div>

            </form>
        </>
    }
}