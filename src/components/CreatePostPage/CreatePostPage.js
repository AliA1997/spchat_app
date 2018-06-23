import React, { Component } from 'react';
import PostForm from '../postSubComponents/PostForm/PostForm';
// import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './CreatePostPage.css';

class CreatePostPage extends Component {

    redirect = (path) => {
        this.props.history.push(`/${path}`);
    }
    render() {
        console.log('---------this.props', this.props.history);
        return (
            <div className='create-post-page-div'>
                <h1 className='title create-post-form'>Create New Post</h1>
                <div className='create-post-page-wrapper'>
                    <PostForm redirect={this.redirect}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
}

export default withRouter(connect(mapStateToProps)(CreatePostPage));