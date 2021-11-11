import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import logo from './PopStopLogo.png';
import './landing.css'

export class Login extends React.Component {

    render() {
        return <>
            <img id="logoPic" class="card-img-top" src={logo}/>
            <div class="d-flex flex-row justify-content-center">
                <Card class="p-2 mx-sm" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title class="text-primary">Restaurant Login</Card.Title>
                        <Card.Text class="text-center text-muted">
                            <h5>If you own/represent a restaurant, follow the links below </h5>
                        </Card.Text>
                        <Button variant="primary">Login</Button>
                        <br />
                        <Button variant="primary">Register</Button>
                    </Card.Body>
                </Card>

                <Card class="p-2 mx-sm" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title class="text-primary">Diner Login</Card.Title>
                        <Card.Text class="text-center text-muted">
                            <h5>If you are a customer looking for restaurants, follow the links below</h5>
                        </Card.Text>
                        <Button variant="primary">Login</Button>
                        <br />
                        <Button variant="primary">Register</Button>
                    </Card.Body>
                </Card>
            </div>

        </>;

    }
}