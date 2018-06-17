import React, { Component } from 'react';
import defaultPicture from '../../../imgs/default-picture.jpg';

export default class UserCard extends Component {
    render() {
        return (
            <div className='user-card-container-div'>
                <div className='user-card-div'>
                    <div className='user-card-img-div'>
                        <img className='user-card-img' 
                        src={this.props.image || defaultPicture} alt={this.props.username} />
                        <p className='user-card-username-div'>{this.props.username}</p>
                    </div>
                    <div className='user-card-info-div'>
                        <div className='user-card-wrapper'>
                            <p className='user-card-info-text'>{this.props.email}</p>
                            <p className='user-card-info-text'>{this.props.age}</p>
                            <p className='user-card-info-text'>{this.props.favorite_sport}</p>
                            <p className='user-card-info-text'>{this.props.favorite_teams}</p>
                            <p className='user-card-info-text'>{this.props.favorite_players}</p>    
                            <p className='user-card-info-text'>{JSON.stringify(this.props.verified)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}