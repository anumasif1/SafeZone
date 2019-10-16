import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

class Logout extends Component  {
    
    componentDidMount () {
        Axios
            .get("/api/logout/")
            .then(resp => {
                console.log("Logged Out!");
            })
            .catch(err => {
                console.log(err);
            })
    }

    render () {
        
        return (
            <>
                <Redirect to="/" />
            </>
        )
    }
}

export default Logout;