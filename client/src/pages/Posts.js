import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Posts.css';
import Axios from 'axios';

class Posts extends Component {

    state = {
        postFull: []
    }

    componentDidMount () {
        Axios
            .get("/api/isloggedin")
            .then(resp => {
                Axios
                    .get("/api/getpost/")
                    .then(resp2 => {
                        console.log("RESP2: ", resp2.data);
                        this.setState({
                            postFull: resp2.data
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
                if (resp.data.message === "n") {
                    this.setState({
                        // loginRequireStyle: "",
                        // conversationFullStyle: "none"
                    })
                } else if (resp.data.message === "y") {
                    let obj = {
                        message: ["Start Chat Here..."]
                    };
                    this.setState({
                        // userId: resp.data.id,
                        // chatBoxStyle: "",
                        // userName: resp.data.user
                    });
                }
                console.log("isloggedin", resp);
            })
            .catch(err => {
                console.log(err);
            });
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
                {/* Post form to database */}
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
                <hr></hr>
                {/* Display all posts from database */}
                <Container id="postDisplayCon">
                    {this.state.postFull.map(item => (
                        <div key={item.id}>{item.user}//{item.title}//{item.level}//{item.post}</div>
                    ))}
                </Container>
            </>
        )
    }
}

export default Posts;