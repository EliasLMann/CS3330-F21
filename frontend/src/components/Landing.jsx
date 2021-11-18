import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import logo from './PopStopLogo.png';
import './landing.css'

import { Link } from 'react-router-dom';

export class Login extends React.Component {

    render() {
        return <>
<<<<<<< Updated upstream
            <img id="logoPic" class="card-img-top" src={logo}/>
=======
            <img id="background" src="https://wallpaperaccess.com/full/4895186.jpg" style={{filter: 'blur(2px)'}}/>
            <img id="logoPic" className="card-img-top justify-content-left" src={logo} />
>>>>>>> Stashed changes
            <div class="d-flex flex-row justify-content-center">
                <Card class="p-2 mx-l" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title class="text-center text-primary mx-auto">Login to PopStop</Card.Title>
                        <div className="row">
                            <Link className="btn btn-primary col" to='/login'>Login</Link>
                            <br />
                            <Link className="btn btn-primary col" to='/register'>Register</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        </>;

    }
}