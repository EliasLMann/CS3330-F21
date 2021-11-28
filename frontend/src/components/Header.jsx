import { Navbar, Nav } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';



const LoggedInHeader = () => {
    const userRepository = new UserRepository();
    const [userContext, setUserContext] = useContext(UserContext);

    const logout = () => {
        return setUserContext('')
    }

    return (
        <Navbar className="d-flex flex-row p-2">
            <a className="navbar-brand" href="/">PopStop</a>
            <Nav className="">
                <div className="d-flex flex-row">
                    <Nav.Link href="/profile"
                        className="p-2">My Profile</Nav.Link>
                    <Nav.Link href="/"
                        className="p-2">Find Restaurants</Nav.Link>
                    <Nav.Link href="/"
                        className="text-end"
                        onClick={logout()}>Logout</Nav.Link>
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

    useEffect( () => {
        const user = userContext;
        console.log(user);
        if (user.username) {
            console.log(user);
            setLoggedIn(true);
        }
    }, []);

    return loggedIn ? <LoggedInHeader /> : <LoggedOutHeader />;


};