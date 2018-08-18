import React from 'react';
import MdCheck from 'react-icons/lib/md/check';
import './UserPopup.css';

const UserPopup = (props) => {
    const { username, image, email, favorite_teams, favorite_players } = props;
    return (
        <div className='user-popup-container'>
            <h1>Registered {username}!</h1>
            <MdCheck className='user-popup-check' />
            <img src={image} alt={username}  className='user-popup-img' />
            <p>Email: {email}</p>
        </div>
    );
};

export default UserPopup;