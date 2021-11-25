import React from "react";
import Card from 'react-bootstrap/Card';
import { Header } from "./Header";
import { Link } from 'react-router-dom';
import { ReviewList } from "./ReviewList";


export class CustomerAccount extends React.Component{
    state = {
        reviews: [
            { restaurantID: "Pop's Restaurant", userID: "UserName1", body: "This is a review", date: "date1" },
            { restaurantID: "Mom's Restaurant", userID: "UserName2", body: "This is also a review", date: "date2" }
        ]

      };

    render() {
        return<>
            <h1>UserName</h1>
            <ReviewList reviews={this.state.reviews}/>
        </>
    }
}