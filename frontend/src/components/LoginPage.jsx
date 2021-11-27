import React, { useContext, useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import { UserRepository } from '../api/userRespository';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const userRepository = new UserRepository();

    const login = async (e) => {
        console.log("test");
        setIsLoading(true);
        const res = await userRepository.login(username, password);
        if (res) setIsLoading(false);
        if (!res.success) {
            setErrors(res);
            alert("fail");
            <Redirect to="/login/" />
        } else {
            <Redirect to="/search"/>
            console.log("success")
        }

    };

    useEffect(() => {
        let res = userRepository.getRestaurants();
      });

    return <>

        <div className="card mt-5 w-75 mx-auto justify-content-center align-items-center">

            <h1 className="card-header w-100 text-center mx-auto">Login</h1>

            <div className="card-body">
                <form id="registerForm" className="card-body text-center" onSubmit={login}>
                    <label for="userName">Username: </label>
                    <input
                        type="text" id="userName" name="userName"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}                    >
                    </input>

                    <br />

                    <label for="password">Password: </label>
                    <input
                        type="password" id="password" name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>

                    <br />

                    <button
                        type="submit"
                        className="btn btn-primary">Log in</button>
                </form>
            </div>
            <p className="text-sm">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>

    </>;
}

export default LoginPage;
