import React from "react";
import { Header } from "./Header";

export class SearchPage extends React.Component {

    render() {
        return (<>

            <Header />

            <div className="card align-center">
                <h2 className="card-header text-center">Search PopStop:</h2>

                <div class="input-group mx-auto w-75">
                    <input type="text" class="form-control" aria-label="Text input with dropdown button" />
                    <div class="input-group-append">
                        <select class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <option>Average Price</option>
                            <option>Cuisine Type</option>
                            <option>Location</option>
                            <option>Zip Code</option>
                            <option>Distance from Location</option>
                        </select>
                    </div>
                </div>
            </div>
        </>)
    }

}