import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PlayerCard from '../userSubComponents/PlayerCard/PlayerCard';
import TeamCard from '../userSubComponents/TeamCard/TeamCard';
import Post from '../postSubComponents/Post/Post';
import Loader from '../generalSubComponents/Loader/Loader';
import { connect } from 'react-redux';
import axios from 'axios';
import './UserPage.css';
import defaultPicture from '../../imgs/default-picture.jpg';

class UserPage extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            posts: [],
            user: null
        }
    }
    componentDidMount() {
        const { loading } = this.state;
        if(!loading) this.setState({loading: true});
        // console.log('id------------', this.props.match.params.id);
        const userAxiosRequest = axios.get(`/api/users/${this.props.match.params.id}`);
        const postsAxiosRequest = axios.get(`/api/posts/${this.props.match.params.id}`);
        Promise.all([userAxiosRequest, postsAxiosRequest])
        .then(res => { 
            console.log(res);
            this.setState({user: res[0].data.user[0], post: res[1].data.posts, loading: false});
        }).catch(err => console.log('Axios User Error---------', err));

    }

    render() {
        const { loading, posts, user } = this.state;
        // console.log("user-----------------", user);
        if(!loading) {
            return (
                <div className='user-page-container-div'>
                    <div className='user-page-div'>
                        <div className='user-page-img-div'>
                            <img className='user-page-img' 
                            src={user.image || defaultPicture} alt={user.username} />
                            <p className='user-page-username-div'>{user.username}</p>
                        </div>
                        <div className='user-page-social-icons'>
                        </div>
                        <div className='user-page-info-div'>
                            <div className='user-page-wrapper'>
                                <p className='user-page-info-text'>{user.email}</p>
                                <p className='user-page-info-text'>{user.age}</p>
                                <p className='user-page-info-text'>{user.favorite_sport}</p>
                                <div className='user-page-info-text'>
                                    {user && user.favorite_teams.map((team, i) => <TeamCard key={i} {...team} />)}
                                </div>
                                <div className='user-page-favorite-players'>
                                    {user && user.favorite_players.map((player, i) => <PlayerCard key={i} {...player} />)}
                                </div>    
                                <p className='user-page-info-text'>{JSON.stringify(user.verified)}</p>
                            </div>
                        </div>
                        <div className='recent-posts-div'>
                            <h1>Recent Posts</h1>
                            {posts.map((post, i) => <Post key={i} {...post} />)}
                        </div>
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
        currentUser: state.user.currentUser,
    };
}

export default withRouter(connect(mapStateToProps)(UserPage));