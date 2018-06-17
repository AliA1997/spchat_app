import React from 'react';

const PlayerCard = (props) => {
    return (
        <div className='player-card-container-div'>
            <div className='player-card-wrapper'>
                <img src={props.playerImage} alt={props.name} />
                <p>{props.name}</p>
            </div>
        </div>
    );
};

export default PlayerCard;