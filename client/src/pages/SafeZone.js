import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import AddressForm from './AddressForm';
import SocketAlert from './SocketAlert';
import io from 'socket.io-client';
import Axios from 'axios';
import './SafeZone.css';

const socket = io();
let ioTimeout; 

class SafeZone extends Component {

    
    state = {
        socketLoadStyle: "none",
        valueSocketIo: "",
        timeoutStyle: "",
        loggedInUser: ""
    }

    componentDidMount() {
        Axios
            .get("/api/isloggedin")
            .then(resp => {
                this.setState({
                    loggedInUser: resp.data.user
                })
                console.log("isloggedin", resp);
            })
            .catch(err => {
                console.log(err);
            });
        this.handleSocketIo();
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

    handleSocketIo = () => {
        // if (item) {
            socket.emit('sendmsg', "New Neighbor Checked In!");
            socket.on('recvmsg', data => {
                this.setState({
                    socketLoadStyle: "inline",
                    timeoutStyle: "inline",
                    valueSocketIo: '"' + data + '"',
                });
                // document.getElementById("socketNotification").innerHTML = data
                this.fadeoutSocketIoNotification(3);
                console.log('client receive :', data);
            })
        // } 
        // else {
        //     socket.emit('sendmsg', "Welcome!");
        //     socket.on('recvmsg', data => {
        //         this.setState({
        //             socketLoadStyle: "inline",
        //             timeoutStyle: "inline",
        //             valueSocketIo: '"' + data + '"',
        //         });
        //         this.fadeoutSocketIoNotification(5);
        //         console.log('client receive :', data);
        //     })
        // }
        return false;
    };

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
        return (
            <Container>
                <div className="fixed-top" id="socketAlertComponent" style={timeoutStyle}>
                    <SocketAlert style={socketIoNotification} value={this.state.valueSocketIo} />
                </div>
                <div>
                    <AddressForm />
                </div>
            </Container >
        )
    }
}

export default SafeZone;