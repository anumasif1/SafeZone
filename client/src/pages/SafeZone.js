import React, { Component } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import AddressForm from './AddressForm';
import SocketAlert from './SocketAlert';
import io from 'socket.io-client';
import Axios from 'axios';
import './SafeZone.css';
import News from './News';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage, renderCustomComponent } from 'react-chat-widget';
import './ReactChat.css';
import Posts from './Posts';
// import logo from './favicon.ico';

const socket = io();
let ioTimeout;

class SafeZone extends Component {


    state = {
        socketLoadStyle: "none",
        valueSocketIo: "",
        timeoutStyle: "",
        loggedInUser: "",
        rcwSenderDisplayStyle: "none",
        reactChatStyle: "none !important",
        typingStatus: ""
    }

    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
        this.setState({
            typingStatus: "Stay Alive!"
        })
        Axios
            .get("/api/isloggedin")
            .then(resp => {
                if (resp.data.message === "n") {
                    this.setState({
                        loggedInUser: "Guest",
                        rcwSenderDisplayStyle: ""
                    });
                }
                if (resp.data.message === "y") {
                    this.handleSocketIo();
                    this.setState({
                        loggedInUser: resp.data.user,
                        rcwSenderDisplayStyle: ""
                    });
                }
                console.log("isloggedin", resp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    clearFadeoutTime = (arg) => {
        clearTimeout(arg);
    }

    fadeoutSocketIoNotification = (time) => {
        this.clearFadeoutTime(ioTimeout);
        ioTimeout = setTimeout(() => {
            this.setState({
                socketLoadStyle: "none"
            })
        }, time * 1000);
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

    handleOnChangeTyping = () => {
        socket.emit('sendtype', this.state.userName);
        socket.on('recvtype', data => {
            this.setState({
                onChangeTest: data + " is typing..."
            });
            this.fadeoutSocketIoTyping(2);
            console.log(data)
        })
    }

    handleSocketIo = () => {
        // if (item) {
        socket.emit('sendmsg', "New Neighbor Checked In!");
        socket.on('recvmsg', data => {
            this.setState({
                socketLoadStyle: "inline",
                timeoutStyle: "inline",
                valueSocketIo: '"' + data + '"',
            });
            this.fadeoutSocketIoNotification(3);
            console.log('client receive :', data);
        })
        return false;
    };

    handleSocketIoPanda = newMessage => {
        socket.removeAllListeners();
        if (!this.loggedInUser) {
            this.setState({
                // loggedInUser: "Guest"
            })
        }
        socket.emit('sendreactchat', this.state.loggedInUser + ": " + newMessage);
        socket.on('recvreactchat', data => {
            addResponseMessage(data);
        })
    }

    render() {
        const socketIoNotification = {
            display: this.state.socketLoadStyle,
            height: "100%",
            width: "100%"
        }
        const timeoutStyle = {
            display: this.state.timeoutStyle,
            textAlign: "center",
            marginTop: "80px"
        }
        const reactChatStyle = {
            display: this.reactChatStyle
        }
        return (
            <Container>
                <div className="fixed-top" id="socketAlertComponent" style={timeoutStyle}>
                    <SocketAlert style={socketIoNotification} value={this.state.valueSocketIo} />
                </div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./slide-1.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className="slideFontStyle">Sign Up, Check the Address & Stay Safe!</h3>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./slide-2.jpg"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3 className="slideFontStyle">Report the incidents in your area!</h3>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./slide-3.jpg"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3 className="slideFontStyle"> See latest news from your city!</h3>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div>
                    <AddressForm />
                </div>
                <div className=' card news-tab'>
                <div className='row col-md-2'>
                        <img src="./news.png" alt="latest news"/>
                    </div>
                    <div className='row col-md-10'>
                    {/* <h1>Headlines</h1>   */}
                    <News />
                    </div>
                    {/* <h1>News Headlines</h1>
                    <News /> */}
                </div>
                <div className='card' id="postCard">
                    <Posts />
                </div>
                <div style={reactChatStyle}>
                    <div className="App reactChat">
                        <Widget
                            handleNewUserMessage={this.handleSocketIoPanda}
                            // profileAvatar={logo}
                            title="Safe Zone Community"
                            subtitle="Chat Room"

                        />
                    </div>
                </div>
            </Container >
        )
    }
}

export default SafeZone;