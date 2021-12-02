import Card from 'react-bootstrap/Card';
import logo from './PopStopLogo.png';
import backgroundImg from './background.jpg';
import './landing.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import { SearchPage } from "./SearchPage";
import { UserRepository } from "../api/userRespository";
import { UserContext } from '../context';
import { Header } from './Header';


const Welcome = () => {
    return (<>
        <Header/>
        <img id="background" src={backgroundImg} style={{ filter: 'grayscale(40%)' }} />
        <img id="logoPic" className="card-img-top justify-content-left" src={logo} />
        <div className="d-flex flex-row justify-content-center">
            <Card id="login_box" className="p-2 mx-l" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className="text-center login_text">Login or register to find you next meal!</Card.Title>
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
    const userRepo = new UserRepository();
    const [loggedIn, setLoggedIn] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);
    

    useEffect( () => {
        const user = userContext;
        if (user.username) {
            console.log(user);
            setLoggedIn(true);
            if(!user.userId) {
                userRepo.updateSession(userRepo.currentUser().username);
            }
        }
    }, []);

    return loggedIn ? <SearchPage /> : <Welcome />;
   
};