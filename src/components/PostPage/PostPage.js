import React, { Component } from 'react';
import Comments from '../Comments/Comments';
import Chat from '../chatSubComponents/Chat/Chat';
import Loader from '../generalSubComponents/Loader/Loader';
import FaTrophy from "react-icons/lib/fa/trophy";
import { connect } from 'react-redux';
import { getPost } from '../../redux/reducers/postReducer';
import axios from 'axios';
import './PostPage.css';

class PostPage extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        }
    }
    componentDidMount() {
        console.log('id------------', this.props.match.params.post);
        const { dispatch } = this.props;
        axios.get(`/api/post/${this.props.match.params.post}`).then(res => {
            console.log(res.data.post);
            dispatch(getPost(res.data.post[0]));
            this.setState({loading: false});
        }).catch(err => console.log('Axios All Error!!!---------', err));
        // this.retrieveData(this.props.match.params.post);
    }
    // async retrieveData(post_id) {
    //     const { dispatch } = this.props;
    //     await axios.get(`/api/posts/${post_id}`).then(res => {
    //         console.log('post----------', res.data.post);
    //         // dispatch(getPost(res.data.post[0]));
    //         this.setState({loading: false});
    //     }).catch(err => console.log('Axios All Error!!!---------', err));
    // }
    reRender = () => {
        const { dispatch } = this.props;
        axios.get(`/api/post/${this.props.match.params.post}`).then(res => {
            dispatch(getPost(res.data.post[0]));
            this.setState({loading: false});
        }).catch(err => console.log('Axios All Error!!!---------', err));
    }
    addGold(points) {
        const { title } = this.props.currentPost;
        console.log('-----------id', this.props.match.params.post);
        console.log('-------------currentPoint', points);
        axios.patch('/api/posts/liked', {points, post_id: this.props.match.params.post, title})
        .then(res => {
            console.log('-----------currentPoint', points);
            this.reRender();
            alert(res.data.message);
        }).catch(err => console.log('Axios Patch Error---------', err));
    }
    addSilver(points) {
        const { title } = this.props.currentPost;
        axios.patch('/api/posts/liked', {points, post_id: this.props.match.params.post, title})
        .then(res => {
            this.reRender();
            alert(res.data.message);
        }).catch(err => console.log('Axios Patch Error---------', err));
    }
    addBronze(points) {
        const { title } = this.props.currentPost;
        axios.patch('/api/posts/liked', {points, post_id: this.props.match.params.post, title})
        .then(res => {
            this.reRender();
            alert(res.data.message);
        }).catch(err => console.log('Axios Patch Error---------', err));
    }
    render() {
        const { currentPost } = this.props;
        const { loading } = this.state;
        console.log('--------', this.props.match);
        console.log('id------------', this.props.match.params.post);
        console.log('-currentPost------------', currentPost);
        if(!loading) {
            return (
                <div className='post-page-container'>
                    <div className='post-page-wrapper'>
                        <div className='post-page-title-div'>
                            {currentPost && currentPost.title}
                        </div>
                        <div className='post-page-image-div'>
                            <img className='post-page-image' src={currentPost && currentPost.image} 
                            alt={currentPost && currentPost.title}/>
                        </div>
                        <div className='post-page-points-div'>
                                <p>Bronze: {currentPost ? currentPost.bronze : 0} 
                                    <FaTrophy className='bronze-trophy-icon trophy' onClick={() => this.addBronze(1)} />
                                </p>
                                <p>Silver: {currentPost ? currentPost.silver : 0}
                                    <FaTrophy className='silver-trophy-icon trophy' onClick={() => this.addSilver(2)} />
                                </p>
                                <p>Gold: {currentPost ? currentPost.gold : 0}
                                    <FaTrophy className='gold-trophy-icon trophy' onClick={() => this.addGold(3)} />
                                </p>
                                <p>Total Points: {currentPost ? currentPost.total_points : 0}</p>
                        </div>
                        <div className='post-page-user-info-wrapper'>
                            <div className='post-page-user-info-social-icons'>
                                <p className='post-page-twitter-icon'></p>
                                <p className='post-page-facebook-icon'></p>
                                <p className='post-page-linkedin-icon'></p>
                                <p className='post-page-twitter-icon'></p>
                            </div>
                            <div className='post-page-user-info'>
                                <p>
                                    {currentPost && currentPost.username}
                                </p>
                                <p> 
                                    {currentPost && currentPost.email}
                                </p>
                            </div>
                        </div>
                        <div className='post-page-description-div'>
                            {currentPost && currentPost.description}
                        </div>
                        <div className='post-page-chat-container-div'>
                            <Chat topic={currentPost && currentPost.title} 
                            postId={currentPost && currentPost.id}/>
                        </div>
                        <Comments postId={this.props.match.params.post}/>
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }
}

const mapStateToProps = state => {
    return {
        currentPost: state.post.currentPost,
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(PostPage);