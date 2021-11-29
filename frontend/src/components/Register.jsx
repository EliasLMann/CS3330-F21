import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import { UserRepository } from '../api/userRespository';
import { UserContext } from '../context';
import { RestaurantOwnerForm } from './RestaurantOwnerForm';
import { Header } from './Header';
import { Landing } from './Landing';


const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redoPassword, setRedoPassword] = useState('');
    const [accountType, setAccountType] = useState('');

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);
    const history = useHistory();
    const userRepository = new UserRepository();

    const accountTypes = [
        " ",
        "Restaurant Owner",
        "Customer"
    ]


    const register = () => {
        if (accountType === "Restaurant Owner") {
            userRepository.addUser(userName, password);
            return history.push('/ownerInfo');
        }
        else if (accountType === "Customer") {
            console.log("YAYAYAYA");
            userRepository.addUser(userName, password);
            setUserContext(userRepository.currentUser());
            return history.push('/');
        }
        
    }
    // const login = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);
    //     const res = await userRepository.login(username, password);
    //     if (res) setIsLoading(false);
    //     if (!res.success) {
    //         setErrors(res);
    //     } else {
    //         setUserContext(userRepository.currentUser());
    //         history.push('/');
    //     }
    // };

    useEffect(() => {
        console.log(accountType);
        const user = userContext;
        if (user.username) {
            console.log(user);
            history.push('/');
        }
    });

    return <>
        <Header />
        <div className="card mt-5 w-75 mx-auto justify-content-center align-items-center">

            <h1 className="card-header w-100 pt-2 text-center align-center">Register</h1>

            <form id="registerForm" className="card-body text-center" onSubmit={register}>
                <label htmlFor="email">Enter your email: </label>
                <input
                    type="text" id="email" name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </input>

                <br />

                <label htmlFor="userName">Username: </label>
                <input
                    type="text" id="userName" name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                >
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

                <label htmlFor="redoPassword">Verify password: </label>
                <input
                    type="password" id="redoPassword" name="redoPassword"
                    value={redoPassword}
                    onChange={(e) => setRedoPassword(e.target.value)}
                >
                </input>

                <br />

                {
                    (redoPassword !== "" && (password !== redoPassword)) &&
                    <div className="card">
                        <span className="text-danger">Passwords do NOT match!</span>
                    </div>
                }

                <br />

                <label htmlFor="accountType">I am a...</label>
                <select
                    name="accountType" id="accountType"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                >
                    {
                        accountTypes.map((x, i) =>
                            <option key={i} > {x}</option>)
                    }
                </select>

                <br />

                {/* {
                    accountType === "Restaurant Owner" && <RestaurantOwnerForm />
                } */}

                <br />

                <button className="btn btn-primary" type="submit">Submit</button>

            </form>

        </div>

    </>;
}

export default Register;