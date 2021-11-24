import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';

export const Header = () => {
    return (
        <Navbar className="d-flex flex-row p-2">
            <a className="navbar-brand" href="/">PopStop</a>
            <Nav className="">
                <div className="d-flex flex-row">
                <Nav.Link href="/profile" 
                            className="p-2">My Profile</Nav.Link>
                <Nav.Link href="/home"
                            className="p-2">Find Restaurants</Nav.Link>
                <Nav.Link href="/register"
                        className="text-end">Register</Nav.Link>
                </div>
            </Nav>
            <Nav>
                
            </Nav>
        </Navbar>
    );
};