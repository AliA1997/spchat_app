import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from '../generalSubComponents/Loader/Loader';
import Post from '../postSubComponents/Post/Post';
import Search from '../generalSubComponents/Search/Search';
import axios from 'axios';
import './PostsPage.css';

class PostsPage extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            search: '',
            loading: true  
        }
    }
    componentDidMount() {
        const { search } = this.props;
        console.log('search----------', search);
        axios.get(`/api/search/posts?post=`)
        .then(res => {
            console.log('Posts of search-------------', res.data.posts);
            this.setState({posts: res.data.posts, loading: false});                       
        }).catch(err => console.log('Axios get searchPosts--------', err));
    }
    linkFunc = (path) => {
        this.props.history.push(path);
    }
    handleChange = (val) => {
        this.setState({loading: true});
        axios.get(`/api/search/posts?post=${val}`)
        .then(res => {
            console.log('Posts of search-------------', res.data.posts);
            this.setState({posts: res.data.posts, loading: false});                       
        }).catch(err => console.log('Axios get searchPosts--------', err));
    }
    render() {
        const { posts, loading } = this.state;
        return (
            <div className='posts-page-container-div'>
                <Search handleChange={this.handleChange}/>
                <h2 className='posts-page title'>Search Results</h2>
                {!loading ? (posts && posts.length) ? posts.map((item, i) => i < 10 && <Post key={i} {...item} linkTo={this.linkFunc}/>) 
                : <div className='posts-page-no-results-container-div'>
                    <p className='posts-page-no-results-text'>No Results</p>
                </div> : <Loader />}
            </div>
        );
    }
}



export default withRouter(PostsPage);

