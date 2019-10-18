import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap';
import './Login.css';
import Axios from 'axios';

class Login extends Component {


    state = {
        userName: "",
        loggingInStyle: "none"
    }

    handleOnClickSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loggingInStyle: "",
            dateSelected: !this.state.dateSelected
        })
        let data = {
            username: document.getElementById("formBasicUsername").value,
            password: document.getElementById("formBasicPassword").value
        };
        Axios
            .post("/api/login/", data)
            .then(resp => {
                this.setState({
                    awaitRedirect: true
                })
                window.location.replace("/");
                console.log(resp.status);
                console.log("This is login", resp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleOnClickReset = (event) => {
        event.preventDefault();
        document.getElementById("formBasicUsername").value = "";
        document.getElementById("formBasicPassword").value = "";
    }

    render() {
        const loggingInStyle = {
            display: this.state.loggingInStyle,
            color: "green",
            fontWeight: "bolder"
        }
        return (
            <>
                <div className={`selectMask_box_login ${this.state.dateSelected ? "maskLogin" : ""} `} style={loggingInStyle}>
                    <p style={{ marginTop: "100px", fontSize: "38px" }}>Logging in...</p>
                </div>
                <Container className="userModal">
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name" name="username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" />
                        </Form.Group>
                        {/* <Form.Group controlId="fromBasicLoggingIn" style={loggingInStyle}>
                            Logging in...
                        </Form.Group> */}
                        <Button variant="primary" type="submit" onClick={this.handleOnClickSubmit}>
                            Submit
                        </Button>
                        <Button variant="secondary" style={{ marginLeft: "10px" }} onClick={this.handleOnClickReset}>
                            Reset
                        </Button>
                    </Form>
                </Container>

            </>
        )
    }
}

export default Login;