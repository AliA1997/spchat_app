import React, { Component } from 'react';
import { connect } from 'react-redux';
import { edit, doneEdit } from '../../../redux/reducer';
import IoCloseCircled from 'react-icons/lib/io/close-circled';
import GoPencil from 'react-icons/lib/go/pencil';
import axios from 'axios';

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            edit: false,
        }
    }
    deleteComment() {
        // console.log('WHat-s wrong--------', this.props);
        // console.log('currentPost----------', this.props.currentPost[0].id);
        // console.log('postId--------------', this.props.post_id);
        // console.log('comment id---------------', this.props.id);
        // console.log('this.props comment----------', this.props);
        axios.delete(`/api/comments/${this.props.currentPost[0].id}/${this.props.id}`)
        .then(res => {
            this.setState(this.state);            
            this.props.reRender();
            // console.log('message-----------', res.data.message);
        }).catch(err => console.log('Axios delete error!', err));
    }
    editComment() {
        console.log('Edit Method hit------------');
       const { text, edit } = this.state;
       const { currentUser } = this.props;
       let today = new Date();
       const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()} + `;
       console.log('-------date', date);
        if(edit) {
            axios.put(`/api/comments/${this.props.post_id}/${this.props.id}`, {text, date})
            .then(res => {
                console.log(res.data.message);
                this.setState({edit: false});
                this.props.reRender();
            }).catch(err => console.log('Axios Put Error--------------', err));
        } else {
            // if(currentUser.username === this.props.username)
             this.setState({edit: true})
        }
    }
    handleEditChange(val) {
        this.setState({text: val});
    } 
    render() {
        const { text, edit } = this.state;
        console.log('COmment text---------', this.props.text);
        console.log('Post-id----------', this.props.postId);
        return (
            <div className='comment-div'>
                <p className='comment-username'>{this.props.username}</p>
                <p className='comment-text'>{this.props.text}</p>                
                <div className='comment-button-div'>
                    <button onClick={() => this.editComment()}>Edit<GoPencil /></button>
                    <button onClick={() => this.deleteComment()}>Delete<IoCloseCircled /></button>
                </div>
                <textarea className='comment-text-area' value={text}
                placeholder={this.props.text}
                style={{display: edit ? 'inline-block' : 'none'}}
                onChange={e => this.handleEditChange(e.target.value)}>
                </textarea>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        currentPost: state.currentPost
    }
}

export default connect(mapStateToProps)(Comment)