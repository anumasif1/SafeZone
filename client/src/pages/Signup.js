import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import './Signup.css';
import Axios from 'axios';

class Signup extends Component {

    state = {
        userName: "",
        signingUpStyle: "none",
        errorMessage: "",
        errorMessageStyle: "",
        isLoggedIn: ""
    }

    handleOnClickSubmit = (event) => {
        event.preventDefault();
        this.setState({
            dateSelected: !this.state.dateSelected
        })
        let data = {
            username: document.getElementById("formBasicUsername").value,
            email: document.getElementById("formBasicEmail").value,
            password: document.getElementById("formBasicPassword").value,
            address: document.getElementById("formBasicAddress").value
        };




        Axios
            .post("/api/signup/", data)
            .then(resp => {

                Axios
                    .get("/api/fail/")
                    .then(respFail => {
                        if (respFail.data.message.length !== 0) {
                            this.setState({
                                errorMessage: respFail.data.message,
                                errorMessageStyle: ""
                            })
                            // window.location.replace("/login/");
                            console.log("$$$$$$$$$", respFail.data.message);
                        } else {
                            this.setState({
                                signingUpStyle: ""
                            })
                            window.location.replace("/");
                            console.log("This is Singup", resp);
                            console.log(resp.status)
                        }
                    })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleOnClickReset = (event) => {
        event.preventDefault();
        document.getElementById("formBasicUsername").value = "";
        document.getElementById("formBasicEmail").value = "";
        document.getElementById("formBasicPassword").value = "";
        document.getElementById("formBasicAddress").value = "";
    }

    render() {
        const signingUpStyle = {
            display: this.state.signingUpStyle,
            color: "green",
            fontWeight: "bolder"
        }
        const errorMessageStyle = {
            display: this.state.errorMessageStyle,
            color: "red"
        }
        return (
            <>
                <div className={`selectMask_box_signup ${this.state.dateSelected ? "maskSignup" : ""} `} style={signingUpStyle}>
                    <p style={{ marginTop: "100px", fontSize: "38px" }}>Signing up...</p>
                </div>
                <Container className="userModal">
                    <Form>
                        <Form.Group style={errorMessageStyle}>
                            {this.state.errorMessage}
                        </Form.Group>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" name="username" />
                            <Form.Text className="text-muted">
                                You'll use your user name to login.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" />
                        </Form.Group>
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

export default Signup;