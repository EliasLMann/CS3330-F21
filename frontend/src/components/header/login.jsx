import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



export class Login extends React.Component {

    render() {
        return <>
            <h1 class="fixed-top">Popstop</h1>
            <div class="d-flex flex-row">
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