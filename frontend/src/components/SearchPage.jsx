import React from "react";

import logo from './PopStopLogo.png';

export class SearchPage extends React.Component {

    render() {
        return (<>
            <Header />

            <img id="logoPic" class="card-img-top mx-auto " src={logo}/>

            <div className="card align-center">
                <h2 className="card-header text-center">Search PopStop:</h2>
                
                <div class="input-group mx-auto w-75">
                    <input type="text" class="form-control" aria-label="Text input with dropdown button"/>
                    <div class="input-group-append">
                        <select class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <option>Average Price, Cuisine Type, Distance from location, Location, ZipCode</option>
                        </select>
                    </div>
                </div>
            </div>
            
        </>)
    }

}