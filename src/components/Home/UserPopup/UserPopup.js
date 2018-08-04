import React from 'react';
import MdCheck from 'react-icons/lib/md/check';
import './UserPopup.css';

const UserPopup = (props) => {
    const { username } = props;
    return (
        <div>
            <MdCheck className='user-popup-check' />
            <h1>Registered {username}</h1>
        </div>
    );
};

export default UserPopup;