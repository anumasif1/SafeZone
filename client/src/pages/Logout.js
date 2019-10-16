import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

class Logout extends Component  {
    
    state = {
        awaitRedirect: ""
    }

    componentDidMount () {
        Axios
            .get("/api/logout/")
            .then(resp => {
                this.setState({
                    awaitRedirect: true
                })
                if (this.state.awaitRedirect) {
                    return <Redirect to="/" />
                }
                console.log("Logged Out!");
            })
            .catch(err => {
                console.log(err);
            })
    }

    render () {
        return (
            <>
            </>
        )
    }
}

export default Logout;