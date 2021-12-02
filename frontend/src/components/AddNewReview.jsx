import React, { useState, useEffect } from "react"
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MenuItemRepository } from "../api/menuItemRepository";
import { RestaurantRepository } from "../api/restaurantRepository";
import { UserRepository } from "../api/userRespository";
import { useParams } from 'react-router';
import { menuItem } from "../models/menuItem";
import { Header } from "./Header";
import CardHeader from "react-bootstrap/esm/CardHeader";

export const AddNewReview = props => {
    const userRepo = new UserRepository();
    const restRepo = new RestaurantRepository();
    const [date, setDate] = useState("");
    const [restID, setRestID] = useState("");
    const [userID, setUserID] = useState("");
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(0)

    useEffect(() => {
        setUserID(userRepo.currentUser().userId)
        setRestID(props.restID);
        let today = new Date();
        setDate(today);

        console.log("Add UserID: " + userID)
    }, []);

    const Add = () => {
        let reviewInfo = [restID, userID, body, date, 0, rating];
        userRepo.addReview(reviewInfo);
        setBody("");
        setRating(0)
    }

    return <>
        <br />
        <br />
        <div className="container">
                <div className="d-flex flex-row justify-content-center">
                    <Card className="p-2 mx-l" style={{ width: '75%' }}>
                        <CardHeader className="h4 fw-bolder">Add review</CardHeader>
                        <form className="container">
                                <div className="row">
                                        <div className="form-group col-md-3">
                                            <label className="col-form-label" htmlFor="ratingField">Rating</label>
                                            <select id="ratingID"
                                                name="ratingField"
                                                className="form-control"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value={0} defaultValue></option>
                                                <option value={1}>1 star</option>
                                                <option value={2}>2 stars</option>
                                                <option value={3}>3 stars</option>
                                                <option value={4}>4 stars</option>
                                                <option value={5}>5 stars</option>
                                            </select>
                                        </div>
                                        

                                        <div className="form-group mb-4">
                                            <label htmlFor="comments">Comments</label>
                                            <textarea
                                                id="comments" name="comments"
                                                value={body}
                                                onChange={(e) => setBody(e.target.value)}
                                                className="form-control" />
                                        </div>
                                        
                                        <div className="d-grid gap-2">
                                            <button type="button" className="btn btn-primary mx-3" onClick={Add}>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </div>

    </>

}
