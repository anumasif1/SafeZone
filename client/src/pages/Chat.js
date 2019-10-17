import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import './Chat.css';
import io from 'socket.io-client';
const socket = io();

class Chat extends Component {

    state = {
        conversation: []
    }

    componentDidMount() {
        let input = document.getElementById("chatInput").value;
    }

    handleSocketIo = arg => {
        socket.emit('sendchat', arg);
        socket.on('recvchat', data => {
            this.setState({
                conversation: data
            })
            console.log('client receive :', data);
        })

    }

    handleOnClickSubmit = event => {
        event.preventDefault();
        let input = document.getElementById("chatInput").value;
        let spVar = this.state.conversation;
        spVar.push(input);
        this.handleSocketIo(spVar);

        let data = {
            content: input
        }

        document.getElementById("chatInput").value = "";
        
        Axios
            .post("/api/chat/", data)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <>
                <Container style={{ width: "500px" }}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Chat Input: </Form.Label>
                            <Form.Control as="input" rows="3" id="chatInput" placeholder="Input here..." />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" type="submit" onClick={this.handleOnClickSubmit}>
                        Send
                    </Button>
                </Container>

                <Container className="" id="conversation" style={{ width: "500px" }}>
                    {this.state.conversation.map(item => (
                        <div key={item.id} className="conversationMap">{item}</div>
                    ))}
                </Container>
            </>
        )
    }
}

export default Chat;