<img src="./client/public/favicon.ico" align="right" width="175px" height="180px"/>

# [Safe Zone](https://obscure-journey-79165.herokuapp.com/) ![iTh1nkBadge](https://img.shields.io/badge/-iTh1nk-blue?logo=visual-studio-code) [![HitCount](http://hits.dwyl.com/iTh1nk/project-safezone.svg)](http://hits.dwyl.com/iTh1nk/project-safezone) 

* ***Safe Zone*** app is designed to help people living in local community be aware of what is happening around to avoid dangerous situations like crime or wild animals;
* Users can check on specific address through auto-fill address form to see if anything should be paid attention to;
* It is useful in some situations like if user want to run around community at night but do know if there is something danger happening that has been seen by other neighbors; 
* The app provides real-time chat function for users who logged in; for logged in users, they can post anything they have been discovered;
* Interface is extreme friendly. Users can input address they want to check, and the app will show map and popups give details back to users;
* There are pre-defined ***5 Levels*** people can post based on how dangerous is the situation;
* All data is saved in database;
* Link to deployed web: https://obscure-journey-79165.herokuapp.com/
---
* Technologies that are used for this app includes: ***Node.JS***, ***Express.JS***, ***Passport.JS***, ***Socket.IO***, ***Moment.JS***, ***Express Session***, ***Cheerio***, ***React.JS***, ***React-BootStrap***, ***MongoDB***, etc. 
* The app use Leafmap API to pull geo-location data, and local crime headlines from [OCRegister](https://ocregister.com);
* Following parts will show some key features in this app: 
* ```Socket.IO``` real-time chat: 
    ```javascript
        io.on('connection', function (socket) {
            socket.on('sendmsg', function (data) {
                console.log('sendmsg => server receive :', data);
                io.emit('recvmsg', data)
            });
            ......
        });
    ```
* ```Socket.IO``` real-time typing status: 
    ```javascript
        handleOnChange = () => {
            socket.emit('sendtype', this.state.userName);
            socket.on('recvtype', data => {
                this.setState({
                    onChangeTest: data + " is typing..."
                });
                this.fadeoutSocketIoTyping(2);
            })
        }
    ```
* Password encryption: 
    ```javascript
        const generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
    ```
* Only logged in users be able to send chat and make post and comments: 
    ```javascript
        Axios
            .get("/api/isloggedin")
            .then(resp => {
                Axios
                    .get("/api/getchat/")
                    .then(resp2 => {
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
            })
            .catch(err => {
                console.log(err);
            });
    ```
* The app give certain group of users like "admin" group ability to delete posts; 