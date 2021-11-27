import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import logo from './PopStopLogo.png';
import backgroundImg from './background.jpg';
import './landing.css'

import { Link } from 'react-router-dom';
export class Landing extends React.Component {

    render() {
        return <>
            <img id="background" src={backgroundImg} style={{filter: 'grayscale(40%)'}}/>
            <img id="logoPic" className="card-img-top justify-content-left" src={logo} />
            <div class="d-flex flex-row justify-content-center">
                <Card id="login_box" class="p-2 mx-l" style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title class="text-center login_text">Login or register to find you next meal!</Card.Title>
                        {/* <Card.Text class="text-center text-muted">
                            <h5>If you own/represent a restaurant, follow the links below </h5>
                        </Card.Text> */}
                        <div className="row">
                            <Link className="btn btn-primary col-4 mx-auto my-auto" to='/login'>Login</Link>
                            <br />
                            <Link className="btn btn-primary col-4 mx-auto my-auto" to='/register'>Register</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        </>;

    }
}