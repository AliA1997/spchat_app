import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../generalSubComponents/Loader/Loader';
import Post from '../postSubComponents/Post/Post';
import EditPost from '../postSubComponents/EditPost/EditPost';
import PlayerCard from '../userSubComponents/PlayerCard/PlayerCard';
import TeamCard from '../userSubComponents/TeamCard/TeamCard';
import { editPost } from '../../redux/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import defaultPicture from '../../imgs/default-picture.jpg';
import './Dashboard.css';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            posts: [],
            edit: true
        }
    }
    componentDidMount() {
        console.log('componentDidMOunt Dashbaord hit');
        const { currentUser } = this.props;
        console.log('Current User-----------', currentUser);
        if(currentUser) {
            axios.get('/api/user-posts')
            .then(res => {
                console.log(res.data.posts);
                this.setState({posts: res.data.posts, loading: false});
            }).catch(err => console.log('Axios get user posts error---------', err));
        } else {
            alert('Must Login or Register');
            this.props.history.push('/login');
        }
    }
    deletePost() {
        const { title, sport, user_id, id, description, tags } = this.props; 
        if(window.confirm('You are sure you want to delete this post?')) {
            axios.delete(`/api/posts`, {
                data: {title, sport, user_id, description, id, tags }
            })
            .then(res => {
                console.log(res.data.message);
            }).catch(err => console.log('Axios Delete Error----------', err));
        } else {

        }
    }
    reRender = () => {
        axios.get('/api/user-posts')
        .then(res => {
            console.log(res);
            this.setState({posts: res.data.posts});
        }).catch(err => console.log('Axios get user posts error---------', err));
    }

    render() {
            const { currentUser, currentPost, doEditPost } = this.props;
            const { dispatch } = this.props;
            const { posts, loading } = this.state;
            console.log('posts dashboard----------------', posts)
            if(!loading) {
                return (
                    <div className='dashboard-container-div'>
                        <div className='dashboard-user-div'>
                            <div className='dashboard-user-img-div'>
                                <img className='dashboard-user-img' 
                                src={currentUser.image || defaultPicture} alt={currentUser.username} />
                                <p>{currentUser.username && currentUser.username}</p>
                            </div>
                            <div className='dashboard-user-info-div'>
                                <div className='dashboard-user-info-wrapper'>
                                    <p className='dashboard-user-info-text'>
                                    Email: {currentUser.email && currentUser.email}
                                    </p>
                                    <p className='dashboard-user-info-text'>
                                    Age: {currentUser.age && currentUser.age}
                                    </p>
                                    <p className='dashboard-user-info-text'>
                                    Favorite League: {currentUser.favorite_sport && currentUser.favorite_sport}
                                    </p>
                                    {currentUser.favorite_players && currentUser.favorite_players.map((player, i) => {
                                        return <PlayerCard key={i} {...player} />
                                    })}
                                    {currentUser.favorite_teams && currentUser.favorite_teams.map((team, i) => {
                                        return <TeamCard key={i} {...team} />
                                    })}
                                </div>
                            </div>
                        </div>
                        {(currentUser && posts) && posts.map((post, i) => {
                            return (
                            <div key={i}>
                                <Post {...post}
                                user_image={currentUser.image} username={currentUser.username}/>
                                <button onClick={() => dispatch(editPost())}>Edit</button>
                                <EditPost reRender={this.reRender} 
                                style={{display: doEditPost ? 'inline-block' : 'none'}} {...post} />
                            </div>
                            );
                            }
                        )}
                    </div>
                );
        } else {
            return <Loader />
        }
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state._persist.rehydrated && !state.loggedOut ? state.currentUser : state._persist.currentUser
    }
}
export default withRouter(connect(mapStateToProps)(Dashboard));