import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Posts.css';
import Axios from 'axios';

class Posts extends Component {

    state = {

    }

    handleOnClick = (event) => {
        event.preventDefault();

        let data = {
            title: document.getElementById("postTitle").value,
            post: document.getElementById("postContent").value,
            level: document.getElementById("postLevel").value,
            user: "User Name"
        }

        Axios
            .post("/api/savepost/", data)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <>
                <Container id="postCon">
                    <Form>
                        <Form.Group controlId="postTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title..." />
                        </Form.Group>
                        <Form.Group controlId="postLevel">
                            <Form.Label>Emergency Level</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="postContent">
                            <Form.Label>Post Details</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Enter details..." />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleOnClick}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </>
        )
    }
}

export default Posts;