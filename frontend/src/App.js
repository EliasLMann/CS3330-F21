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
import {Landing } from './components/Landing';

// React functional component
function App () {
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
    axios.get(`http://${url}:8000/`).then((res)=>{
      alert(res.data);
    })
  }

  // fetches vals of db via GET request
  // const fetchVals = () => {
  //   axios.get(`http://${url}:8000/values`).then(
  //     res => {
  //       const values = res.data.data;
  //       console.log(values);
  //       setValues(values)
  //   }).catch(err => {
  //     console.log(err)
  //   });
  // }

  // handle input form submission to backend via POST request
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let prod = number * number;
  //   axios.post(`http://${url}:8000/multplynumber`, {product: prod}).then(res => {
  //     console.log(res);
  //     fetchVals();
  //   }).catch(err => {
  //     console.log(err)
  //   });;
  //   setNumber("");
  // }

  // handle intialization and setup of database table, can reinitialize to wipe db
  // const reset = () => {
  //   axios.post(`http://${url}:8000/reset`).then(res => {
  //     console.log(res);
  //     fetchVals();
  //   }).catch(err => {
  //     console.log(err)
  //   });;
  // }

  // tell app to fetch values from db on first load (if initialized)
  // useEffect(() => {
  //   fetchVals();
  // }, [])

  return (<>

    <Header />
    <Router>
      <Route component = {Login}  path="/login"/>
      <Route component = {RegisterPage}  path="/register"/>
      <Route component = {SearchPage}  path="/home"/>
      <Route component = {RestaurantProfile}  path="/profile"/>
      <Route component = {AddMenu} path="/addMenu"/>
      <Route component = {Landing} path="/" exact/>
    </Router>
    

    {/* <div className="App">

      
      <header className="App-header">
        <Login />
        {/* <button onClick={fetchBase} style={{marginBottom: '1rem'}}> {`GET: http://${url}:8000/`} </button>
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchBase} style={{marginBottom: '1rem'}}> {`GET: http://${url}:8000/`} </button>
        <button onClick={reset}> Reset DB </button>
        <form onSubmit={handleSubmit}>
          <input type="text" value={number} onChange={handleChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          { values.map((value, i) => <li key={i}>{value.value}</li>) }
        </ul> */}
     
  </>);
}

export default App;
