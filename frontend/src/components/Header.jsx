import { Navbar, Nav } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import { UserRepository } from '../api/userRespository';



const LoggedInHeader = () => {
    const userRepo = new UserRepository(); 
    return (
        <Navbar className="d-flex flex-row p-2">
            <span>&nbsp;</span>
            <a className="navbar-brand" href="/">PopStop</a>
            <Nav className="">
                <div className="d-flex flex-row">
                    <Nav.Link href="/"
                        className="p-2 btn btn-outline-secondary">Find Restaurants</Nav.Link><span>&nbsp;</span>
                    <Nav.Link href="/profile"
                        className="p-2 btn btn-outline-secondary">My Profile</Nav.Link> <span>&nbsp;</span>
                    <Nav.Link href="/"
                        className="text-end btn btn-outline-secondary" onClick={() => userRepo.logout()}>Logout</Nav.Link>
                </div>
            </Nav>
        </Navbar>
    );
}

const LoggedOutHeader = () => {

    return (
        <Navbar className="d-flex flex-row p-2">
            <a className="navbar-brand" href="/">PopStop</a>
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