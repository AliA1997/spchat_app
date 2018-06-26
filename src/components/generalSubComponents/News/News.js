import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Slideshow from '../Slideshow/Slideshow';
import axios from 'axios';
import './News.css';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsArticles: []
        }
    }
    componentDidMount() {
        const { title } = this.props;
        const { newsArticles } = this.state;
        const today = new Date();
        const day = today.getDate() - 3 > 0 ? (today.getDate() - 3) : 30 - 3;
        const month = today.getDate() - 3 > 0 ? today.getMonth() + 1 : today.getMonth() - 1;
        const toDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        const fromDate = `${month}/${day}/${today.getFullYear()}`;
        axios.get(`https://newsapi.org/v2/everything?q=${title}&sources=bleacher-report&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=d1642d3b4bed4f2aab806cc68e637563`)
        .then(res => {
            let copyOfArrState = newsArticles.slice();
            for(let i = 0; i < 5; i++) {
                copyOfArrState = [...copyOfArrState, {title: res.data.articles[i].title, imageurl: res.data.articles[i].urlToImage, link: res.data.articles[i].url}];
            }
            this.setState({newsArticles: copyOfArrState});
        }).catch(err => console.log('Axios News Error-------', err));
    }
    render() {
        const { newsArticles } = this.state;
        return (
            <div className='news-container'>
                {/* <div className='news-header'></div> */}
                <Slideshow slides={newsArticles}/>
            </div>
        );
    }
}

News.defaultProps = {
    slides: [1]
}