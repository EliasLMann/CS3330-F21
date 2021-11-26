import React from "react";

export class LoginPage extends React.Component {

    state = {
        userName: "",
        password:"",
        isOwner:false
    }

    onSubmitClick(){

    }


    render(){

        return<>

            <div className="card mt-5 w-75 mx-auto justify-content-center align-items-center">

                <h1 className="card-header w-100 text-center mx-auto">Login</h1>

                <div className="card-body">
                    <form id="registerForm"className="card-body text-center">
                        <label for="userName">Username: </label>
                        <input 
                            type="text" id="userName" name="userName"
                            value={this.state.email}
                            onChange={event => this.setState({userName: event.target.value})}
                        >
                        </input>

                        <br/>

                        <label for="password">Password: </label>
                        <input 
                            type="text" id="password" name="password"
                            value={this.state.password}
                            onChange={event => this.setState({password: event.target.value})}
                        >
                        </input>

                        <br/>

                        <button
                            type="button"
                            onClick={ () => this.onSubmitClick() }
                            className="btn btn-primary">Log in!</button>
                    </form>
                </div>
            </div>
        
        </>;
    }
}