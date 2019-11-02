import React, { Component } from 'react';
import Axios from 'axios';
import { Container } from 'react-bootstrap';
import './News.css';

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
                <Container id="newsSec">
                    {/* <h1>Headlines</h1> */}
                    {this.state.news.map((item, index) => (
                        <div key={item.id}>
                            <div className="newSecMapTitle">
                                {index + 1}. <a className="newSecMapLink" target="_blank" href={item.link}>{item.title}</a>
                            </div>
                            {/* <div>
                                <a className="newSecMapLink" href={item.link}>{item.link}</a>
                            </div> */}
                            <hr></hr>
                        </div>
                    ))}
                </Container>
            </>
        )
    }
}

export default News;