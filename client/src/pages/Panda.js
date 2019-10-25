import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import logo from '../avatar.jpg';

import io from 'socket.io-client';
const socket = io();
let ioTimeout;

class Panda extends Component {

    state = {

    }

    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
    }

    

    handleSocketIo = newMessage => {
        socket.emit('sendreactchat', newMessage);
        socket.on('recvreactchat', data => {
            // handleNewUserMessage = (newMessage) => {
                console.log(`New message incoming! ${newMessage}`);
                // Now send the message throught the backend API
            // }
            // console.log('client receive :', [this.state.userName + this.state.conversation]);
        })
    }

    render() {
        return (
            <div className="App">
                <Widget
                    // handleNewUserMessage={this.handleSocketIo}
                    profileAvatar={logo}
                    title="My new awesome title"
                    subtitle="And my cool subtitle"
                />
            </div>
        );
    }
}

export default Panda;