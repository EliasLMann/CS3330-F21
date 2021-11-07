import React from "react";

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

                
            </form>
        </>
    }
}