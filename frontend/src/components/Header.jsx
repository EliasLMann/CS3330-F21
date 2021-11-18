import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';

export const Header = () => {
    return (
        <Navbar className="mr-auto p-2">
            <a className="navbar-brand" href="#">PopStop</a>
            <Nav className="mr-auto">
                <Nav.Link href="/profile">My Profile</Nav.Link>
                <Nav.Link href="/home">Find Restaurants</Nav.Link>
            </Nav>
        </Navbar>
    );
};