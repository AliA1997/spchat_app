import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTime } from '../../logic';
import axios from 'axios';
import Comment from '../generalSubComponents/Comment/Comment';
import Loader from '../generalSubComponents/Loader/Loader';
import IoIosComposeOutline from 'react-icons/lib/io/ios-compose-outline';
import './Comments.css';

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            comments: [],
            loading: true 
        }
    }
    componentDidMount() {
        this.getComments();
    }
    getComments = () => {
        // const { currentPost } = this.props;
        const { loading } = this.state;
        if(!loading) this.setState({loading: true});
        axios.get(`/api/comments/${this.props.postId}`).then(res => {
            this.setState({comments: res.data.comments, loading: false});
        }).catch(err => console.log('Axios get comments error--------', err));
    }
    changeTextArea(val) {
        this.setState({text: val});
    }
    createComment() {
        console.log(this.props.id);
        const { currentUser } = this.props;
        const { text } = this.state;
        const date = getTime();
        const username = currentUser ? currentUser.username : 'Anonymous';
        console.log('username--------', username);
        axios.post(`/api/comments/${this.props.postId}`, { text, username, date })
        .then(res => {
            console.log('Message--------------', res.data.message);
            this.getComments();
            this.setState({loading: true, text: ''});
        }).catch(err => console.log('Axios Post Error------------', err));
    }
    render() {
        const { comments, loading, text } = this.state;
        // console.log('comments----------', comments);
        if(!loading) {
            return (
                <div className='comments-container-div'>
                    <h1>Comments</h1>
                    <textarea onChange={e => this.changeTextArea(e.target.value)}
                    className='create-comment-textarea' value={text} placeholder='Place comment here!'>
                    </textarea>
                    <button className='create-comment-button'
                    onClick={() => this.createComment()}>Create<IoIosComposeOutline /></button>
                    <div className='comments-div'>
                    {comments && comments.map((comment, i) => <Comment key={i} reRender={this.getComments} {...comment}/>)}
                    </div>
                </div>
            );
        } else {
            return (
                <div className='comments-container-div'>
                    <h1>Comments</h1>
                    <Loader isSmall={true}/>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        currentPost: state.user.currentPost,
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Comments)