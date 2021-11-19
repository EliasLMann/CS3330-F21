import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import logo from './PopStopLogo.png';
import './landing.css'

import { Link } from 'react-router-dom';

import { Header } from "./Header";

export class Landing extends React.Component {

    render() {
        return <>
            <Header />
            <img id="background" src={backgroundImg} style={{filter: 'grayscale(40%)'}}/>
            <img id="logoPic" className="card-img-top justify-content-left" src={logo} />
            <div class="d-flex flex-row justify-content-center">
                <Card class="p-2 mx-l px-5" style={{ width: '30rem', large:'20rem'}}>
                    <Card.Body>
                        <Card.Title class="text-center text-primary mx-auto font-weight-bold">Login to PopStop</Card.Title>
                        <br />
                        <div className="row px-3">
                            <Link className="btn btn-primary col mx-3" to='/login'>Login</Link>
                            <br />
                            <Link className="btn btn-primary col" to='/register'>Register</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        </>;

    }
}