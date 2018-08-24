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
                <div className='user-page container-div'>
                    <div>
                        <div>
                            <img style={{height: '100%', width: '100%'}}
                            src={user.image || defaultPicture} alt={user.username} />
                            <div>
                                <p>{user.username}</p>
                                <p>{user.email}</p>
                                <p>{user.age}</p>
                                <p>{user.favorite_sport}</p>
                                <p>{JSON.stringify(user.verified)}</p>
                            </div>
                        </div>
                        <p style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Favorite Teams</p>
                        <div>
                            {user && user.favorite_teams.map((team, i) => <TeamCard key={i} {...team} />)}
                        </div>
                        <p style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Favorite Players</p>
                        <div>
                            {user && user.favorite_players.map((player, i) => <PlayerCard key={i} {...player} />)}
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