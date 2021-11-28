import React from "react";
import {Dropdown} from "react-bootstrap";

export class SearchPage extends React.Component {

    render() {
        return (<>

            <div className="card align-center w-75 mx-auto">
                <h2 className="card-header text-center">Search PopStop:</h2>
                
                <div class="input-group mx-auto p-3 w-100 align-middle">
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
                    <input type="text" class="form-control align-middle" placeholder="Find your next destination..."/>
                    <button className="btn btn-secondary h-25">Search</button>
                </div>
            </div>
        </>)
    }

}