import React from 'react';
import './TeamCard.css';

const TeamCard = (props) => {
    return (
        <div className='team-card-div'>
            <div className='team-card-img-div'>
                <img className='team-card-img'
                src={props.teamImage} alt={props.name} />
            </div>
            <p>{props.name}</p>
        </div>
    );
};

export default TeamCard;