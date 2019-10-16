import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import './Signup.css';
import Axios from 'axios';

class Signup extends Component {

    state = {
        submitRedirect: "",
        userName: ""
    }

    handleOnClickSubmit = (event) => {
        event.preventDefault();
        let data = {
            username: document.getElementById("formBasicUsername").value,
            email: document.getElementById("formBasicEmail").value,
            password: document.getElementById("formBasicPassword").value,
            address: document.getElementById("formBasicAddress").value
        };
        Axios
            .post("/api/signup/", data)
            .then(resp => {
                this.setState({
                    submitRedirect: true
                })
                console.log(resp);
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
        if (this.state.submitRedirect) {
            return <Redirect to="/" />
        }
        return (
            <>
                <Container className="userModal">
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" name="username" />
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
                        <Button variant="primary" type="submit" onClick={ this.handleOnClickSubmit }>
                            Submit
                        </Button>
                        <Button variant="secondary" style={{ marginLeft: "10px" }} onClick={ this.handleOnClickReset }>
                            Reset
                        </Button>
                    </Form>
                </Container>
            </>
        )
    }
}

export default Signup;