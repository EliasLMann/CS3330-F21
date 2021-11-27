import { Navbar, Nav } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { UserRepository } from '../api/userRespository';


const LoggedInHeader = () => {
    const userRepository = new UserRepository();

    return (
        <Navbar className="d-flex flex-row p-2">
            <a className="navbar-brand" href="/">PopStop</a>
            <Nav className="">
                <div className="d-flex flex-row">
                    <Nav.Link href="/profile"
                        className="p-2">My Profile</Nav.Link>
                    <Nav.Link href="/home"
                        className="p-2">Find Restaurants</Nav.Link>
                    <Nav.Link href="/"
                        className="text-end"
                        onClick={userRepository.logout()}>Logout</Nav.Link>
                </div>
            </Nav>
            <Nav>

            </Nav>
        </Navbar>
    );
}

const LoggedOutHeader = () => {
    const userRepository = new UserRepository();


    return (
        <Navbar className="d-flex flex-row p-2">
            <a className="navbar-brand" href="/">PopStop</a>
            <Nav className="">
                <div className="d-flex flex-row">
                    <Nav.Link href="/login"
                        className="p-2">Login</Nav.Link>
                    <Nav.Link href="/register"
                        className="text-end">Register</Nav.Link>
                    <Nav.Link href="/"
                        className="text-end"
                        onClick={userRepository.logout()}>Logout</Nav.Link>
                </div>

            </Nav>
        </Navbar>
    );
}

export const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect( () => {
        const userRepository = new UserRepository();
        setLoggedIn(userRepository.loggedIn());
    }, [loggedIn, setLoggedIn]);

    return loggedIn ? <LoggedInHeader /> : <LoggedOutHeader />;


};