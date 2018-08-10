import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Post from '../postSubComponents/Post/Post';
import Search from '../generalSubComponents/Search/Search';
import axios from 'axios';
import './PostsPage.css';

class PostsPage extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            search: ''
        }
    }
    componentDidMount() {
        const { search } = this.props;
        console.log('search----------', search);
        axios.get(`/api/search/posts?post=${search}`)
        .then(res => {
            console.log('Posts of search-------------', res.data.posts);
            this.setState({posts: res.data.posts});                       
        }).catch(err => console.log('Axios get searchPosts--------', err));
    }
    linkFunc = (path) => {
        this.props.history.push(path);
    }
    handleChange = (val) => {
        axios.get(`/api/search/posts?post=${val}`)
        .then(res => {
            console.log('Posts of search-------------', res.data.posts);
            this.setState({posts: res.data.posts});                       
        }).catch(err => console.log('Axios get searchPosts--------', err));
    }
    render() {
        const { posts } = this.state;
        return (
            <div className='posts-page-container-div'>
                <Search handleChange={this.handleChange}/>
                <h2 className='posts-page title'>Search Results</h2>
                {(posts && posts.length) ? posts.map((item, i) => <Post key={i} {...item} linkTo={this.linkFunc}/>) 
                : <div className='posts-page-no-results-container-div'>
                    <p className='posts-page-no-results-text'>No Results</p>
                  </div> }
            </div>
        );
    }
}



export default withRouter(PostsPage);

