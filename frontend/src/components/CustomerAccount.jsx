    import React from "react";
    import Card from 'react-bootstrap/Card';
    import { Header } from "./Header";
    import { Link } from 'react-router-dom';
    import { ReviewList } from "./ReviewList";
    import { UserRepository } from "../api/userRespository";
    
    
    export class CustomerAccount extends React.Component{
        userRepository = new UserRepository();


        state = {
            user: {},

            reviews: [
                // { restaurantID: "Pop's Restaurant", userID: "UserName1", body: "This is a review", date: "date1" },
                // { restaurantID: "Mom's Restaurant", userID: "UserName2", body: "This is also a review", date: "date2" }
            ]
        };
    
        render() {
            return<>
                <Header/>
                
                {console.log(this.state.user.userID)}
                {/* <ReviewList reviews={userReviews => this.userRepository.getUserReviews(this.state.user.userID)}/> */}
                <ReviewList reviews={this.state.reviews}/>
            </>
        }
    
        componentDidMount() {
            // let id = this.props.match.params.userId
            this.userRepository.currentUser()
                .then(user => this.setState({user}));
        }
    }