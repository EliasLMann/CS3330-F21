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
        
            <h1>Login</h1>

            <form>
                <label for="userName">Username</label>
                <input 
                    type="text" id="userName" name="userName"
                    value={this.state.userName}
                    onChange={event => this.setState({userName: event.target.value})}
                >
                </input>

                <br/>

                <label for="password">Password</label>
                <input 
                    type="text" id="password" name="password"
                    value={this.state.password}
                    onChange={event => this.setState({password: event.target.value})}
                >
                </input>

                <br/>

                <button
                    type="button"
                    onClick={ () => this.onSubmitClick() }>Submit</button>
            </form>
        
        </>;
    }
}