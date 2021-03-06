import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import { Modal, Button, Form } from 'react-bootstrap';
import Axios from 'axios';
import './ComNavbar.css';

let spTimeout;

class ComNavbar extends Component {

    state = {
        loggedInUser: "",
        logoutStyle: "none",
        signupStyle: "none",
        loginStyle: "none",
        reqUserStyle: "none"
    }

    clearTimeout = (arg) => {
        clearTimeout(arg);
    }

    iniTimeout = (sec) => {
        this.clearTimeout(spTimeout);
        spTimeout = setTimeout(() => {
            this.setState({
                socketLoadStyle: "none"
            })
        }, sec * 1000);
    }

    componentDidMount() {
        Axios
            .get("/api/isloggedin")
            .then(resp => {
                if (resp.data.message === "n") {
                    this.setState({
                        loggedInUser: "",
                        logoutStyle: "none",
                        signupStyle: "inline",
                        loginStyle: "inline",
                        reqUserStyle: "none"
                    })
                } else if (resp.data.message === "y") {
                    this.setState({
                        loggedInUser: "Welcome: " + resp.data.user,
                        logoutStyle: "inline",
                        signupStyle: "none",
                        loginStyle: "none",
                        reqUserStyle: "inline"
                    });
                }
                console.log("isloggedin", resp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleOnClickLogout = event => {
        event.preventDefault();
        Axios
            .get("/api/logout/")
            .then(resp => {
                window.location.replace("/");
                console.log("Logged Out!");
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const logoutStyle = {
            display: this.state.logoutStyle,
            color: "red"
        }
        const reqUserStyle = {
            display: this.state.reqUserStyle,
            color: "lightgreen"
        }
        const signupStyle = {
            display: this.state.signupStyle
        }
        const loginStyle = {
            display: this.state.loginStyle
        }

        return (
            <>
                <Nav className="navbar navbar-light bg-dark fixed-top p-0">
                    <span className="navbar-brand mb-0 h1"><a href="/" id="topTitle">SafeZone</a></span>
                    <ul>
                        <li><Nav.Link href="/signup/" style={signupStyle}>Signup</Nav.Link></li>
                        <li><Nav.Link href="/login/" style={loginStyle}>Login</Nav.Link></li>
                        <li><Nav.Link href="" style={reqUserStyle}>{this.state.loggedInUser}</Nav.Link></li>
                        <li><Nav.Link href="" onClick={this.handleOnClickLogout} style={logoutStyle}>Logout</Nav.Link></li>
                        <li><Nav.Link href="/chat/">Chat</Nav.Link></li>
                        {/* <li><Nav.Link href="/news/" style={{}}>News</Nav.Link></li> */}
                        {/* <li><Nav.Link href="/posts/" style={{}}>Post</Nav.Link></li> */}
                        {/* <li><Nav.Link href="/panda/" style={{}}><img src="../avatar.jpg" width="20px" height="20px" /></Nav.Link></li> */}
                    </ul>
                </Nav>
            </>
        )
    }
}

export default ComNavbar;