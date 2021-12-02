import { Navbar, Nav } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import { UserRepository } from '../api/userRespository';
import smallLogo from './SmallerPopStopLogo.png';
import logo from './simpleLogo.png';

const LoggedInHeader = () => {
    const userRepo = new UserRepository(); 
    return (
        <Navbar className="d-flex flex-row p-2 shadow-sm">
            <span>&nbsp;</span>
            <a href="/" className="navbar-brand">
                <img src={logo} height="50"/>
            </a>
            <Nav className="">
                <div className="d-flex flex-row">
                    <Nav.Link href="/"
                        className="p-2">Find Restaurants</Nav.Link><span>&nbsp;</span>
                    <Nav.Link href="/profile"
                        className="p-2">My Profile</Nav.Link> <span>&nbsp;</span>
                    <Nav.Link href="/"
                        className="text-end" onClick={() => userRepo.logout()}>Logout</Nav.Link>
                </div>
            </Nav>
        </Navbar>
    );
}

const LoggedOutHeader = () => {

    return (
        <Navbar className="headNavBar d-flex flex-row p-2 shadow-sm">
            <a href="/" className="navbar-brand">
                <img src={smallLogo} height="50"/>
            </a>
            <Nav className="">
                <div className="d-flex flex-row">
                    <Nav.Link href="/login"
                        className="p-2">Login</Nav.Link>
                    <Nav.Link href="/register"
                        className="text-end">Register</Nav.Link>
                </div>
            </Nav>
        </Navbar>
    );
}

export const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);

    useEffect(() => {
        const user = userContext;
        console.log(user.reastaurantID);
        if (user.username) {
            console.log(user);
            setLoggedIn(true);
        }
    }, []);

    return loggedIn ? <LoggedInHeader /> : <LoggedOutHeader />;


};