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
            editText: '',
            comments: [],
            edit: false,
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
    showEditTextArea = (bool=null) => {
    this.setState({edit: !this.state.edit});
    }
    deleteComment = (post_id, id) => {
        // console.log('WHat-s wrong--------', this.props);
        // console.log('currentPost----------', this.props.currentPost[0].id);
        // console.log('postId--------------', this.props.post_id);
        // console.log('comment id---------------', this.props.id);
        // console.log('this.props comment----------', this.props);
        axios.delete(`/api/comments/${post_id}/${id}`)
        .then(res => {
            this.setState(this.state);     
            this.getComments();
            // console.log('message-----------', res.data.message);
        }).catch(err => console.log('Axios delete error!', err));
    }
    editComment = (post_id, id) => {
        console.log('Edit Method hit------------');
       const { editText, edit } = this.state;
       const { currentUser } = this.props;
       let today = new Date();
       const date = getTime();
       console.log('-------date', date);
        if(edit) {
            axios.put(`/api/comments/${post_id}/${id}`, {text: editText, date})
            .then(res => {
                console.log(res.data.message);
                this.setState({edit: false});
                this.getComments();
            }).catch(err => console.log('Axios Put Error--------------', err));
        } else {
            // if(currentUser.username === this.props.username)
             this.setState({edit: true})
        }
    }
    handleEditChange = (val) => {
        this.setState({editText: val});
    } 
    
    render() {
        const { comments, loading, text, editText, edit } = this.state;
        // console.log('comments----------', comments);
        if(!loading) {
            return (
                <div className='comments-container-div'>
                    <h1>Comments</h1>
                    <textarea onChange={e => this.changeTextArea(e.target.value)} max={200}
                    className='create-comment-textarea' value={text} placeholder='Place comment here!' required>
                    </textarea>
                    <button className='create-comment-button'
                    onClick={() => this.createComment()}>Create<IoIosComposeOutline /></button>
                    <div className='comments-div'>
                    {comments && comments.map((comment, i) => <Comment key={i}  {...comment} handleChange={this.handleEditChange}
                                                showTextArea={this.showEditTextArea} doEditComment={edit} editText={editText} delete={this.deleteComment} edit={this.editComment}/>)}
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