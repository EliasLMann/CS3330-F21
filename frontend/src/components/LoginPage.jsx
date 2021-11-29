import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';
import { Header } from './Header';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);
    const history = useHistory();
    const userRepository = new UserRepository();


    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await userRepository.login(username, password);
        if (res) setIsLoading(false);
        if (!res.success) {
            setErrors(res);
        } else {
            setUserContext(userRepository.currentUser());
            history.push('/');
        }
    };

    useEffect(() => {
        const user = userContext;
        if (user.username) {
            console.log(user);
            history.push('/');
        }
    });

    return <>
        <Header/>
        <div className="card mt-5 w-75 mx-auto justify-content-center align-items-center">

            <h1 className="card-header w-100 text-center mx-auto">Login</h1>

            <div className="card-body">
                <form id="registerForm" className="card-body text-center" onSubmit={login}>
                    <label htmlFor="userName">Username: </label>
                    <input
                        type="text" id="userName" name="userName"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}                    >
                    </input>

                    <br />

                    <label htmlFor="password">Password: </label>
                    <input
                        type="password" id="password" name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>

                    <br />

                    <Button
                        type="submit"
                        className="btn btn-primary">Log in</Button>
                </form>
            </div>
            <p className="text-sm">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>

    </>;
}

export default LoginPage;
