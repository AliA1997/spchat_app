import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { doneSearch } from '../../redux/reducers/searchReducer';
import { connect } from 'react-redux';
import Post from '../postSubComponents/Post/Post';
import axios from 'axios';
import './PostsPage.css';

class PostsPage extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
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
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(doneSearch());
    }
    linkFunc = (path) => {
        this.props.history.push(path);
    }
    render() {
        const { posts } = this.state;
        return (
            <div className='posts-page-container-div'>
                <h1 className='posts-page title'>Search Results</h1>
                {(posts && posts.length) ? posts.map((item, i) => <Post key={i} {...item} linkTo={this.linkFunc}/>) 
                : <div className='posts-page-no-results-container-div'>
                    <p className='posts-page-no-results-text'>No Results</p>
                  </div> }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        search: state.search.search
    }
}

export default withRouter(connect(mapStateToProps)(PostsPage));

