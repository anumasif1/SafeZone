import React, { Component, useState } from 'react';
import { Container, Form, Button, Collapse } from 'react-bootstrap';
import './Posts.css';
import Axios from 'axios';
import Moment from 'moment';
import MakeComment from './MakeComment'

class Posts extends Component {

    state = {
        postFull: [],
        addPostStyle: "none",
        notLoggedInStyle: "",
        userName: ""
    }

    componentDidMount() {
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
                        addPostStyle: "",
                        notLoggedInStyle: "none",
                        userName: resp.data.user
                    });
                }
                console.log("isloggedin", resp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    dateFormat = time => {
        return Moment(time).format("MM-DD-YYYY HH:MM");
    }

    levelColor = level => {
        if (level === 1) {
            return { color: "green" };
        } else if (level === 2) {
            return { color: "yellowgreen" };
        } else if (level === 3) {
            return { color: "orange" };
        } else if (level === 4) {
            return { color: "coral", fontWeight: "bold" };
        } else if (level === 5) {
            return { color: "red", fontWeight: "bolder" };
        }
    }

    handleOnClick = (event) => {
        event.preventDefault();

        let data = {
            title: document.getElementById("postTitle").value,
            post: document.getElementById("postContent").value,
            level: document.getElementById("postLevel").value,
            user: this.state.userName
        }

        Axios
            .post("/api/savepost/", data)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            });

        window.location.reload();
    }

    handleOnClickComment = (event) => {
        event.preventDefault();
        alert("HELLO")
    }

    render() {
        const addPostStyle = {
            display: this.state.addPostStyle
        };
        const notLoggedInStyle = {
            display: this.state.notLoggedInStyle,
            color: "blue",
            marginTop: "80px",
            width: "100%",
            textAlign: "center"
        }
        return (
            <>
                {/* isLoggedIn false display */}
                <Container style={notLoggedInStyle}>
                    Please login to add new posts...
                </Container>
                {/* Post form to database */}
                <Container id="postCon" style={addPostStyle}>
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
                        <div key={item.id} style={{ marginTop: "30px", marginBottom: "50px" }}>
                            <div style={{ fontStyle: "italic", color: "grey" }}>{this.dateFormat(item.createdAt)}</div>
                            <div style={this.levelColor(item.level)}>Level: {item.level}</div>
                            <div>
                                <div style={{ display: "inline", color: "green" }}>{item.user}: </div><div style={{ fontWeight: "bold", display: "inline" }}>{item.title}</div>
                            </div>
                            <div>                                
                                {item.post}
                            </div>
                            <MakeComment notes={item.title} postId={item._id} user={this.state.userName}></MakeComment>
                        </div>
                    ))}
                </Container>
            </>
        )
    }
}

export default Posts;