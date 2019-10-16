import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Login.css';
import Axios from 'axios';

class Login extends Component {

    render () {
        return (
            <>
            <Container className="userModal">
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email" placeholder="Enter user name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="secondary" style={{ marginLeft: "10px" }}>
                            Reset
                        </Button>
                    </Form>
                </Container>
            </>
        )
    }
}

export default Login;