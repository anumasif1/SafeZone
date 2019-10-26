// import React, { Component } from 'react';
// import { Widget, addResponseMessage, addLinkSnippet, addUserMessage, renderCustomComponent } from 'react-chat-widget';

// import 'react-chat-widget/lib/styles.css';
// import logo from '../avatar.jpg';

// import io from 'socket.io-client';
// const socket = io();
// let ioTimeout;

// class Panda extends Component {

//     state = {
//         userName: "iTh1nk"
//     }

//     componentDidMount() {
//         addResponseMessage("Welcome to this awesome chat!");
//     }

//     // handleNewUserMessage = (newMessage, data) => {
//     //     console.log(`New message incoming! ${newMessage}`);
//     //     addResponseMessage(data);
//     // }

//     handleSocketIo = newMessage000 => {
//         socket.removeAllListeners();
//         socket.emit('sendreactchat', this.state.userName + ": " + newMessage000);
//         socket.on('recvreactchat', data => {
//             // this.handleNewUserMessage(newMessage, data);
//             addResponseMessage(data);
//         })
//         // socket.removeListener('recvreactchat');
//     }

//     render() {
//         return (
//             <div className="App">
//                 <Widget
//                     handleNewUserMessage={this.handleSocketIo}
//                     // profileAvatar={logo}
//                     title="Safe Zone Community"
//                     subtitle="Stay Alive"
//                 />
//             </div>
//         );
//     }
// }

// export default Panda;