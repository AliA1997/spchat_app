import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Post.css';

function displayLongWord(str) {
    if(str.length > 10) {
        let strArr = str.split('').slice(0, 20);
        return strArr.concat('....')
        // .join('');
    }
}
class Post extends Component {
    constructor() {
        super();
        this.state = {
            isInDashboard: false,
        }
    }
    componentDidMount() {
        this.setState({isInDashboard: window.location.href === `${window.location.origin}/dashboard` ? true : false})               
    }
    deletePost(e) {
        e.preventDefault();
        const { user_id, id } = this.props; 
        // console.log('user_id------------', user_id);
        // console.log('post_id------------', id);
        if(window.confirm('You are sure you want to delete this post?')) {
            axios.delete(`/api/posts`, {
                data: {id, user_id}
            })
            .then(res => {
                this.props.reRender();
                console.log(res.data.message);
            }).catch(err => console.log('Axios Delete Error----------', err));
        } else {

        }
    }
    linkTo = (path) => {
        this.props.history.push(path);
    }
    render() {
        const displayDescription = displayLongWord(this.props.description); 
        // console.log('isInDashboard State-------------', this.state.isInDashboard);
        // console.log('-----------location', window.location.href)
        // console.log('--------desired location', `http://lalhost:${window.location.port}/dashboard`);
        return (
            <div className='post-container-div'>
                <div className='post-main-div' onClick={() => this.linkTo(`/posts/${this.props.sport}/${this.props.id}`)}>
                    <div className='post-image'>
                        <img src={this.props.image} alt={this.props.title}/>
                    </div>
                    <div className='post-description-div'>
                        <div className='post-user-info-div'>
                            <div className='empty-div-1'></div>
                            <p className='post-username'>{this.props.username}</p>
                            <img className='post-username-image' 
                            src={this.props.user_image} alt={this.props.username} />
                        </div>
                        <div className='post-title-div'>
                            <p className='post-title'>Topic:</p>
                            <p>{this.props.title}</p>
                        </div>
                        <p className='post-date'>{this.props.date}</p>
                        <div className='post-tags-div'>
                            {this.props.tags && this.props.tags.map((tag, i) => <p key={i} className='post-tag'>{tag}</p>)}
                        </div>
                    </div>
                </div>
                <button className='edit-post delete-button' style={{display: this.state.isInDashboard ? 'inline-block' : 'none'}}
                    onClick={(e) => this.deletePost(e)}>Delete</button>
            </div>
        );
    }
}

export default withRouter(connect()(Post));