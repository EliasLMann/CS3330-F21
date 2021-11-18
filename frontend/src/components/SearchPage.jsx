import React from "react";
import {Dropdown} from "react-bootstrap";

import { Header } from "./Header";

export class SearchPage extends React.Component {

    render() {
        return (<>

            <Header />

            <div className="card align-center w-75 mx-auto">
                <h2 className="card-header text-center">Search PopStop:</h2>
                
                <div class="input-group mx-auto p-3 w-100 align-middle">
                    <input type="text" class="form-control align-middle" placeholder="Search for your next destination..."/>

                    <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                        Search By...
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>Average Price</Dropdown.Item>
                        <Dropdown.Item>Cuisine Type</Dropdown.Item>
                        <Dropdown.Item>Location</Dropdown.Item>
                        <Dropdown.Item>Distance</Dropdown.Item>
                        <Dropdown.Item>Zip Code</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>)
    }

}