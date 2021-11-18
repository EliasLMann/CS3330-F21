import React from "react";
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';


export class CustomerAccount extends React.Component{

    render() {
        return<>
            <h1>Account Page</h1>
            <div class="d-flex flex-row justify-content-center">
                <Card class="p-2 mx-l" style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card.Title class="text-rigth h2">Username</Card.Title>
                        {/* <Card.Text class="text-center text-muted">
                            <h5>If you own/represent a restaurant, follow the links below </h5>
                        </Card.Text> */}
                        <div className="row">
                            <Link className="btn btn-primary col" to='/searchPage'>Home</Link>
                        
                        </div>
                    </Card.Body>
                </Card>
            </div>    
        </>
    }
}