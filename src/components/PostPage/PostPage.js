import React, { Component } from 'react';
import Comments from '../Comments/Comments';
import Chat from '../chatSubComponents/Chat/Chat';
import Loader from '../generalSubComponents/Loader/Loader';
import { connect } from 'react-redux';
import { getPost } from '../../redux/reducer';
import axios from 'axios';
import './PostPage.css';

class PostPage extends Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        console.log('id------------', this.props.match.params.post);
        const { dispatch } = this.props;
        axios.get(`/api/posts/${this.props.match.params.post}`).then(res => {
            dispatch(getPost(res.data.post[0]));
            this.setState({loading: false});
        }).catch(err => console.log('Axios All Error!!!---------', err));
    }
    render() {
        const { currentPost, currentUser } = this.props;
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
                            <img className='post-page-image' src={currentPost && currentPost.image} />
                        </div>
                        <div className='post-page-user-info-wrapper'>
                            <div className='post-page-user-info-social-icons'>
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
                        <div>
                            {/* <Chat namespace={this.props.match.params.sport} topic={currentPost}/> */}
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
        currentPost: state.currentPost,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(PostPage);