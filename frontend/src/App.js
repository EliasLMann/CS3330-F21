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
import { Profile } from './components/RestaurantProfile';
import { Header } from './components/Header';
import { CustomerAccount } from './components/CustomerAccount';
import { AddMenu } from './components/AddMenu';
import { Landing } from './components/Landing'
import { UserContext } from './context';
import { UserRepository } from './api/userRespository';
import { RestaurantDetails } from './components/RestaurantDetails';
import Register from './components/Register';
import OwnerInfo from './components/OwnerInfo';
import { UpdateMenu } from './components/UpdateMenu';

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
      <Router>
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={Profile} path="/profile" />
        <Route component={RestaurantDetails} path="/restaurants/:restaurantID" />
        <Route component={UpdateMenu} path="/updateMenu/:itemID" />
        <Route component={AddMenu} path="/addMenu" />
        <Route component={OwnerInfo} path="/ownerInput" />
        <Route component={Landing} exact path="/" />
        <Route component={Register} path="/reg" />
      </Router>
    </UserContext.Provider>

  </>);
}

export default App;
