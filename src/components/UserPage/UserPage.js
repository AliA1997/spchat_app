import React, { Component } from 'react';
import uuid from 'uuid';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './UserPage.css';
import defaultPicture from '../../imgs/default-picture.jpg';

class UserPage extends Component {
    render() {
        const { currentUser } = this.props;
        if(currentUser) {
            return (
                <div className='user-page-container-div'>
                    <div className='user-page-div'>
                        <div className='user-page-img-div'>
                            <img className='user-page-img' 
                            src={currentUser.image || defaultPicture} alt={currentUser.username} />
                            <p className='user-page-username-div'>{currentUser.username}</p>
                        </div>
                        <div className='user-page-social-icons'>
                        </div>
                        <div className='user-page-info-div'>
                            <div className='user-page-wrapper'>
                                <p className='user-page-info-text'>{currentUser.email}</p>
                                <p className='user-page-info-text'>{currentUser.age}</p>
                                <p className='user-page-info-text'>{currentUser.favorite_sport}</p>
                                <p className='user-page-info-text'>{currentUser.favorite_teams}</p>
                                <p className='user-page-info-text'>{currentUser.favorite_players}</p>    
                                <p className='user-page-info-text'>{JSON.stringify(currentUser.verified)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <NavLink to={`/register/${uuid.v4()}`}>
                        <div className='user-page-need-account-header'>
                        Need to Create A Account
                        </div>
                    </NavLink>
                    <NavLink to='/login'>
                        <div className='user-page-login-account-header'>
                        Or Login
                        </div>
                    </NavLink>
                </div>
            )
        }
    }
    
}
const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps)(UserPage);