import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context';
import { Header } from "./Header";


export const RestaurantDetails = (props) => {

    const [userContext, setUserContext] = useContext(UserContext);

    useEffect( () => {
        const user = userContext;
        if (user.username) {
            console.log(user);
        }
    }, []);

    return (
        <>
        <Header/>
        </>
    );
   
};