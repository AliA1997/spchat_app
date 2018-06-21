import React from 'react';
import './PlayerCard.css';

const PlayerCard = (props) => {
    return (
        <div className='player-card-div'>
            <div className='player-card-img-div'>
                <img className='player-card-img'
                src={props.playerImage} alt={props.name} />
            </div>
            <p>{props.name}</p>
        </div>
    );
};

export default PlayerCard;