import Card from 'react-bootstrap/Card';
import logo from './PopStopLogo.png';
import backgroundImg from './background.jpg';
import './landing.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { SearchPage } from "./SearchPage";
import { UserRepository } from "../api/userRespository";


const Welcome = () => {
    return (<>
        <img id="background" src={backgroundImg} style={{ filter: 'grayscale(40%)' }} />
        <img id="logoPic" className="card-img-top justify-content-left" src={logo} />
        <div class="d-flex flex-row justify-content-center">
            <Card id="login_box" class="p-2 mx-l" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title class="text-center login_text">Login or register to find you next meal!</Card.Title>
                    {/* <Card.Text class="text-center text-muted">
                            <h5>If you own/represent a restaurant, follow the links below </h5>
                        </Card.Text> */}
                    <div className="row">
                        <Link className="btn btn-primary col-4 mx-auto my-auto" to='/login'>Login</Link>
                        <br />
                        <Link className="btn btn-primary col-4 mx-auto my-auto" to='/register'>Register</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    </>
    );
}

export const Landing = () => {

    const [loggedIn, setLoggedIn] = useState(false);


    useEffect( () => {
        console.log("SSL: " + sessionStorage.getItem('user'));
        const userRepository = new UserRepository();
        setLoggedIn(userRepository.loggedIn());
        console.log(userRepository.currentUser());
    }, [loggedIn, setLoggedIn]);

    console.log("Logged in? " + loggedIn);
    return loggedIn ? <SearchPage /> : <Welcome />;
   
};