import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import './Chat.css';
import io from 'socket.io-client';
const socket = io();
let ioTimeout;

class Chat extends Component {

    state = {
        conversation: [],
        conversationFull: [],
        chatBoxStyle: "none",
        userName: "",
        userId: "",
        chatToDB: "",
        conversationFullStyle: "",
        loginRequireStyle: "none",
        loadTypingStyle: "none",

        onChangeTest: ""
    }

    componentDidMount() {
        Axios
            .get("/api/isloggedin")
            .then(resp => {
                Axios
                    .get("/api/getchat/")
                    .then(resp2 => {
                        console.log("RESP2: ", resp2.data);
                        this.setState({
                            conversationFull: resp2.data
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
                if (resp.data.message === "n") {
                    this.setState({
                        loginRequireStyle: "",
                        conversationFullStyle: "none"
                    })
                } else if (resp.data.message === "y") {
                    let obj = {
                        message: ["Start Chat Here..."]
                    };
                    this.handleSocketIo(obj);
                    this.setState({
                        userId: resp.data.id,
                        chatBoxStyle: "",
                        userName: resp.data.user
                    });
                }
                console.log("isloggedin", resp);
            })
            .catch(err => {
                console.log(err);
            });
        this.handleOnChange();
        this.handleOnKeyDown();
    }

    clearFadeoutTime = (arg) => {
        clearTimeout(arg);
    }

    fadeoutSocketIoTyping = (time) => {
        this.clearFadeoutTime(ioTimeout);
        ioTimeout = setTimeout(() => {
            this.setState({
                socketLoadStyle: "none",
                loadTypingStyle: "none"
            })
        }, time * 1000);
    }

    handleSocketIo = arg => {
        socket.emit('sendchat', arg);
        socket.on('recvchat', data => {
            this.setState({
                conversation: (" " + data.message).split(",")
            })
            console.log('client receive :', [this.state.userName + this.state.conversation]);
        })

    }

    handleOnClickSubmit = event => {
        event.preventDefault();
        let inputValue = document.getElementById("chatInput").value;
        let input = this.state.userName + ": " + inputValue;
        let spVar = this.state.conversation;
        spVar.push(input);
        let obj = {
            message: spVar
        }
        this.handleSocketIo(obj);

        let data = {
            id: this.state.userId,
            user: this.state.userName,
            content: inputValue
        }

        document.getElementById("chatInput").value = "";

        Axios
            .post("/api/savechat/", data)
            .then(resp => {
                console.log("Chat Added!", resp)
            })
            .catch(err => {
                console.log(err);
            });
        // window.location.reload();
    }

    handleOnChange = () => {
        socket.emit('sendtype', this.state.userName);
        socket.on('recvtype', data => {
            this.setState({
                onChangeTest: data + " is typing..."
            });
            this.fadeoutSocketIoTyping(2);
            console.log(data)
        })
    }

    handleOnKeyUp = () => {
        socket.emit('sendtype', this.state.userName);
        this.handleSocketIoKeyUp();
    }

    handleOnKeyDown = () => {
        socket.emit('sendinitype', this.state.userName);
        socket.on('recvinitype', data => {
            this.setState({
                loadTypingStyle: ""
            });
            console.log(data)
        })
    }

    render() {
        const chatBoxStyle = {
            display: this.state.chatBoxStyle,
        }
        const conversationFullStyle = {
            display: this.state.conversationFullStyle,
            width: "500px"
        }
        const loginRequireStyle = {
            display: this.state.loginRequireStyle,
            width: "100%",
            color: "black",
            fontWeight: "bold",
            marginTop: "100px",
            textAlign: "center"
        }
        const loadTypingStyle = {
            display: this.state.loadTypingStyle,
            color: "grey"
        }

        return (
            <div id="chatMain">
                <Container style={chatBoxStyle}>
                    <Form>
                        <Form.Group>
                            <Form.Label><a style={{fontWeight: "bold", fontSize:"30px"}}>Chat Input:</a> </Form.Label>
                            <div style={loadTypingStyle}>
                                {this.state.onChangeTest}
                            </div>
                            <Form.Control as="input" rows="3" id="chatInput" placeholder="Input here..." onChange={this.handleOnChange} onKeyDown={this.handleOnKeyDown} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleOnClickSubmit}>
                            Send
                        </Button>
                    </Form>
                </Container>

                <Container style={loginRequireStyle} >
                    Please login to start chat...
                </Container>

                <Container className="" id="conversation" style={conversationFullStyle}>
                    {this.state.conversation.map(item => (
                        <div key={item.id} className="conversationMap">{item}</div>
                    ))}
                </Container>

                <Container className="" id="conversationFull" style={conversationFullStyle}>
                    {/* Previous chat history: */}
                    <hr></hr>
                    {this.state.conversationFull.map(item => (
                        <div key={item.id} className="conversationMap">{item.user}: {item.content}</div>
                    ))}
                </Container>
            </div>
        )
    }
}

export default Chat;