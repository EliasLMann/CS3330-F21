import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Login, { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { SearchPage } from './components/SearchPage';
import { RestaurantProfile } from './components/RestaurantProfile';
import { Header } from './components/Header';
import { CustomerAccount } from './components/CustomerAccount';
import { AddMenu } from './components/AddMenu';
import { Landing } from './components/Landing'
import { UserContext } from './context';
import { UserRepository } from './api/userRespository';

// React functional component
function App() {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = 'group2.c1smrv7pnl1w.us-east-2.rds.amazonaws.com'
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  // handle input field state change
  const handleChange = (e) => {
    setNumber(e.target.value);
  }

  const fetchBase = () => {
    axios.get(`http://${url}:8000/`).then((res) => {
      alert(res.data);
    })
  }

  const userRepository = new UserRepository();
  const [context, setContext] = useState(userRepository.currentUser());

  return (<>

    <UserContext.Provider value={[context, setContext]}>
      <Header />
      <Router>
        <Route component={Login} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route component={RestaurantProfile} path="/profile" />
        <Route component={AddMenu} path="/addMenu" />
        <Route component={Landing} path="/" exact />
      </Router>
    </UserContext.Provider>

  </>);
}

export default App;
