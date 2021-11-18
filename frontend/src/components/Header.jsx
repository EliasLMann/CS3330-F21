import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';

export const Header = () => {
    return (
        <Navbar className="mx-4">
            <a className="navbar-brand" href="#">PopStop</a>
            <Nav className="mx-2">
                <Nav.Link href="/profile">My Profile</Nav.Link>
                <Nav.Link href="/home">Find Restaurants</Nav.Link>
            </Nav>
        </Navbar>
    );
};