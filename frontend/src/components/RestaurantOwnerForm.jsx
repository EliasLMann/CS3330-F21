import React from "react";
import update from 'react-addons-update';

import "./registerPage.css";

export class RestaurantOwnerForm extends React.Component {

    hours = [
        "12AM", "1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM",
        "12PM","1PM","2PM",'3PM',"4PM",'5PM','6PM','7PM','8PM','9PM',"10PM","11PM"
    ]

    state = {
        restaurantName:"",
        restaurantAddress:"",

        openDays:[false,false,false,false,false,false,false],
        openTime:"",
        closeTime:""
    }

    checkBox(i){
        this.setState(update(this.state, {
            openDays: {
                [i]: {
                    $set: !this.state.openDays[i]
                }
            }
        }));
    }

    render(){

        return<>
            <form className="card">
                <h2 className="card-header">About your restaurant</h2>
                <br/>
                <div className="d-flex flex-row justify-content-center align-middle">
                    <label className="align-middle"for="restaurantName">Restaurant Name: </label>
                    <input 
                        type="text" id="restaurantName" name="restaurantName"
                        value={this.state.restaurantName}
                        onChange={event => this.setState({restaurantName: event.target.value})}
                    >
                    </input>
                </div>

                <br/>

                <div className="d-flex flex-row justify-content-center">
                    <label for="restaurantAddress">Restaurant Address: </label>
                    <textarea 
                        type="text" id="restaurantAddress" name="restaurantAddress"
                        value={this.state.restaurantAddress}
                        onChange={event => this.setState({restaurantAddress: event.target.value})}
                    >
                    </textarea>
                </div>

                <br/>

                <div class="openTimes card">
                    <span class="card-header">When are you open?</span>

                    <div class="col d-flex flex-row justify-content-center">
                        <div class="row p-2">
                            <label className="mx-auto"for="Sunday"> Sunday </label>
                            <input type="checkbox" id="Sunday" name="Sunday" value="Sunday"
                                    onChange={() => this.checkBox(0)}
                            />
                            <br/>
                        </div>
                        <div class="row p-2">
                            <label for="Monday"> Monday </label>
                            <input type="checkbox" id="Monday" name="Monday" value="Monday"
                                    onChange={() => this.checkBox(1)}
                            />
                        </div>
                        <div class="row p-2">
                            <label for="Tuesday"> Tuesday </label>
                            <input type="checkbox" id="Tuesday" name="Tuesday" value="Tuesday"
                                    onChange={() => this.checkBox(2)}/>
                        </div>
                        <div class="row p-2">
                            <label for="Wednesday"> Wednesday </label>
                            <input type="checkbox" id="Wednesday" name="Wednesday" value="Wednesday"
                                    onChange={() => this.checkBox(3)}/>
                        </div>
                        <div class="row p-2">
                            <label for="Thursday"> Thursday </label>
                            <input type="checkbox" id="Thursday" name="Thursday" value="Thursday"
                                    onChange={() => this.checkBox(4)}/>
                        </div>
                        <div class="row p-2">
                            <label for="Friday"> Friday </label>
                            <input type="checkbox" id="Friday" name="Friday" value="Friday"
                                    onChange={() => this.checkBox(5)}/>
                        </div>
                        <div class="row p-2">
                            <label for="Saturday"> Saturday </label>
                            <input type="checkbox" id="Saturday" name="Saturday" value="Saturday"
                                    onChange={() => this.checkBox(6)}/>
                        </div>
                    </div>
                    <div>
                        <label>From: </label>
                        <select className="mw-25"
                                onChange={event => this.setState({openTime: event.target.value })}
                        >{
                            this.hours.map((x, i) => <option key = {i} > {x}</option>)
                        }</select>
                        <span>-</span>
                        <select className="mw-25"
                                onChange={event => this.setState({closeTime: event.target.value })}
                        >{
                            this.hours.map((x, i) => <option key = {i} > {x}</option>)
                        }</select>
                    </div>
                </div>

            </form>
        </>
    }
}