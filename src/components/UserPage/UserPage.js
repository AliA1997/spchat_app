import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PlayerCard from '../userSubComponents/PlayerCard/PlayerCard';
import TeamCard from '../userSubComponents/TeamCard/TeamCard';
import Popup from '../generalSubComponents/Popup/Popup';
import GoGear from 'react-icons/lib/go/gear';
import { connect } from 'react-redux';
import './UserPage.css';
import defaultPicture from '../../imgs/default-picture.jpg';

class UserPage extends Component {
    constructor() {
        super();
        this.state = {
            isProfile: false
        }
        window.location.href === `http://localhost:3000/dashboard/account` 
        ? this.setState({isProfile: true}) 
        : this.setState({isProfile: false});
    }
    linkFunc(path) {
        this.props.history.push(path);
    }
    render() {
        const { isProfile } = this.state;
        const { currentUser } = this.props;
        if(currentUser) {
            return (
                <div className='user-page-container-div'>
                    <div className='user-page-div'>
                        <div className='user-page-img-div'>
                            <img className='user-page-img' 
                            src={currentUser.image || defaultPicture} alt={currentUser.username} />
                            <p className='user-page-username-div'>{currentUser.username}</p>
                            <GoGear onClick={() => this.linkFunc(`/edit_profile`)} className='gear' style={{display: isProfile ? 'inline-block' : 'none'}}/>
                        </div>
                        <div className='user-page-social-icons'>
                        </div>
                        <div className='user-page-info-div'>
                            <div className='user-page-wrapper'>
                                <p className='user-page-info-text'>{currentUser.email}</p>
                                <p className='user-page-info-text'>{currentUser.age}</p>
                                <p className='user-page-info-text'>{currentUser.favorite_sport}</p>
                                <div className='user-page-info-text'>
                                    {currentUser && currentUser.favorite_teams.map((team, i) => <TeamCard key={i} {...team} />)}
                                </div>
                                <div className='user-page-favorite-players'>
                                    {currentUser && currentUser.favorite_players.map((player, i) => <PlayerCard key={i} {...player} />)}
                                </div>    
                                <p className='user-page-info-text'>{JSON.stringify(currentUser.verified)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Popup />
                </div>
            )
        }
    }
    
}


const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
    };
}

export default withRouter(connect(mapStateToProps)(UserPage));