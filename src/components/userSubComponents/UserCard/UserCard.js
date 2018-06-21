import React, { Component } from 'react';
import axios from 'axios';
import TiUserDelete from 'react-icons/lib/ti/user-delete';
import TiWarning from 'react-icons/lib/ti/warning';
import defaultPicture from '../../../imgs/default-picture.jpg';
import './UserCard.css';

export default class UserCard extends Component {
    constructor() {
        super();
        this.state = {
            warning: '',
            warnings: [
                '',
                'Inactive more than 2 weeks.',
                'Email not verified.',
                'Posts or Comments contains inappropiate information'
            ]
        }
    }
    handleWarningsChange(val) {
        this.setState({warning: val});
    }
    issueWarning() {
        const { email } = this.props;
        // console.log('email----------', email)
        const { warning } = this.state;
        axios.post('/api/warning', {email, warning})
        .then(res => {
            alert(res.data.message);
        }).catch(err => console.log('Warning axios error!!', err));
    }
    delete() {
        const { id } = this.props;
        // console.log('user-id---------', id);
        axios.delete(`/api/admin/users/${id}`)
        .then(res => {
            alert(res.data.message);
            this.props.reRender();
        }).catch(err => console.log('Axios Admin Delete User Error---------', err));
    }
    render() {
        const { isAdmin, username, email, age, favorite_sport, favorite_players, favorite_teams } = this.props;
        const { warning, warnings } = this.state;
        console.log('Favorite teams---------', favorite_teams);
        console.log('Favorite- Players----------', favorite_players);
        return (
            <div className='user-card-container-div'>
                <div className='user-card-div'>
                    <div className='user-card-img-div'>
                        <img className='user-card-img' 
                        src={this.props.image || defaultPicture} alt={username && username} />
                        <p className='user-card-username-div'>{username && username}</p>
                    </div>
                    <div className='user-card-info-div'>
                        <div className='user-card-info'>
                            <p className='user-card-info-text'>Email: {email && email}</p><br/>
                            <p className='user-card-info-text'>Age: {age && age}</p><br/>
                            <p className='user-card-info-text'>Favorite Sport: {favorite_sport && favorite_sport}</p><br/>
                            <p className='user-card-verified-text'>Verified: {JSON.stringify(this.props.verified)}</p>
                            <select onChange={(e) => this.handleWarningsChange(e.target.value)}>
                                {warnings.map((warningItem, i) => <option key={i}>{warningItem}</option>)}
                            </select>
                            <div className='user-card-button-div' style={{display: isAdmin ? 'flex' : 'none'}}>
                                <button className='admin-delete-button' onClick={() => this.delete()}>
                                    Delete<TiUserDelete className='admin-delete-icon' />
                                </button>
                                <button className='admin-warning-button' onClick={() => this.issueWarning()} disabled={!warning && true}>
                                    Issue Warning<TiWarning className='admin-warning-icon' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserCard.defaultProps = {
    isAdmin: false
}