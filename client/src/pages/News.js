import React, { Component } from 'react';
import Axios from 'axios';
import { Container } from 'react-bootstrap';

class News extends Component {
    state = {
        news: []
    }

    componentDidMount() {
        this.getNews();
    }

    getNews = () => {
        Axios
            .get("/api/getnews/")
            .then(resp => {
                this.setState({
                    news: resp.data.obj
                })
                console.log("Get news: ", resp.data.obj)
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <>
                <Container className="" id="conversation" style={{ width: "500px" }}>
                    {this.state.news.map(item => (
                        <div key={item.id} className="conversationMap">
                            {item.title}<br />{item.link}
                            <hr></hr>
                        </div>
                    ))}
                </Container>
            </>
        )
    }
}

export default News;