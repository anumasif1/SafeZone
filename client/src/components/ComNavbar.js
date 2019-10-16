import React, { Component, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Modal, Button, Form } from 'react-bootstrap';
import Axios from 'axios';


class ComNavbar extends Component {

    // const [signupShow, setSignupShow] = useState(false);
    // const handleSignupClose = () => setSignupShow(false);
    // const handleSignupShow = () => setSignupShow(true);

    // const [loginShow, setLoginShow] = useState(false);
    // const handleLoginClose = () => setLoginShow(false);
    // const handleLoginShow = () => setLoginShow(true);

    state = {
        loggedInUser: "",
        loggedInLogout: "",
        loggedInSignup: "Signup",
        loggedInLogin: "Login"
    }

    componentDidMount() {
        this.setState({
            loggedInUser: "",
            loggedInLogout: "",
            loggedInSignup: "Signup",
            loggedInLogin: "Login"
        })
        Axios
            .get("/api/isloggedin")
            .then(resp => {
                this.setState({
                    loggedInUser: "Welcome: " + resp.data,
                    loggedInLogout: "Logout",
                    loggedInSignup: "",
                    loggedInLogin: ""
                })
                console.log("isloggedin", resp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    
render() {


    return (
        <>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Navbar.Brand href="/">Safe Zone</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="" href="/signup/">{ this.state.loggedInSignup }</Nav.Link>
                        <Nav.Link href="" href="/login/">{ this.state.loggedInLogin }</Nav.Link>
                        <Nav.Link href="" >{ this.state.loggedInUser }</Nav.Link>
                        <Nav.Link href="" href="/logout/">{ this.state.loggedInLogout }</Nav.Link>
                        {/* <Nav.Link href="" onClick={handleSignupShow}>Signup</Nav.Link>
                        <Nav.Link href="" onClick={handleLoginShow}>Login</Nav.Link> */}
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                    </Nav>
                    {/* <Nav>
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link>
                </Nav> */}
                </Navbar.Collapse>
            </Navbar>

            {/* Signup Modal */}
            {/* <Modal show={signupShow} onHide={handleSignupClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSignupClose}>Close</Button>
                    <Button variant="primary" onClick={handleSignupClose}>Save Changes</Button>
                </Modal.Footer>
            </Modal> */}

            {/* Login Modal */}
            {/* <Modal show={loginShow} onHide={handleLoginClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleLoginClose}>Close</Button>
                    <Button variant="primary" onClick={handleLoginClose}>Save Changes</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    )
}
}

export default ComNavbar;