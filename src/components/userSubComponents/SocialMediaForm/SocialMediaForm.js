import React, { Component } from 'react';
import { connect } from 'react-redux';
import IoSocialTwitterOutline from 'react-icons/lib/io/social-twitter-outline';
import IoSocialFacebookOutline from 'react-icons/lib/io/social-facebook-outline';
import IoSocialInstagramOutline from 'react-icons/lib/io/social-instagram-outline';
import IoSocialSnapchatOutline from 'react-icons/lib/io/social-snapchat-outline';
import IoSocialRedditOutline from 'react-icons/lib/io/social-reddit-outline';
import IoSocialTwitchOutline from 'react-icons/lib/io/social-twitch-outline';
import IoPlaystation from 'react-icons/lib/io/playstation';
import IoXbox from 'react-icons/lib/io/xbox';
import './SocialMediaForm.css';
import axios from 'axios';

class SocialMediaForm extends Component {
    constructor() {
        super();
        this.state = {
            twitter: '',
            facebook: '',
            instagram: '',
            snapchat: '',
            reddit: '',
            twitchtv: '',
            playstation: '',
            xbox: ''
        }
    }
    handleCrteTwitterChange(val) {
        this.setState({twitter: val});
    }
    handleCrteFacebookChange(val) {
        this.setState({facebook: val});
    }
    handleCrteInstagramChange(val) {
        this.setState({instagram: val});
    }
    handleCrteSnapchatChange(val) {
        this.setState({snapchat: val});
    }
    handleCrteRedditChange(val) {
        this.setState({reddit: val});
    }
    handleCrteTwitchTvChange(val) {
        this.setState({twitchtv: val});
    }
    handleCrtePlaystationChange(val) {
        this.setState({playstation: val});
    }
    handleCrteXboxChange(val) {
        this.setState({xbox: val});
    }
    createSocialMedia = () =>  {
        alert('Button CLicked!!');
        const { currentUser } = this.props;
        const { twitter, facebook, instagram, snapchat, reddit, twitchtv, playstation, xbox } = this.state;
        const body = { twitter, facebook, instagram, snapchat, reddit, twitchtv, playstation, xbox, user_id: currentUser.id };
        axios.post('/api/social-media', body)
        .then(res => {
            alert(res.data.message);
        }).catch(err => console.log('Axios Social Media Error--------', err));
    }
    render() {
        return (
            <form className='social-media-form' >
                <button className='social-media-form-button' onClick={() => this.createSocialMedia()}>
                    Edit Social Media
                </button>
                <p></p>
                <div className='social-icon-div'>
                    <IoSocialTwitterOutline className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteTwitterChange(e.target.value)} />
                </div>
                <div className='social-icon-div'>
                    <IoSocialFacebookOutline className='social-icon' />
                    <input type='text' onChange={(e) => this.handleCrteFacebookChange(e.target.value)} />
                </div>
                <div className='social-icon-div'>
                    <IoSocialInstagramOutline className='social-icon' />
                    <input type='text' onChange={(e) => this.handleCrteInstagramChange(e.target.value)} />
                </div>
                <div className='social-icon-div'>
                    <IoSocialSnapchatOutline  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteSnapchatChange(e.target.value)} />
                </div>
                <div className='social-icon-div'>
                    <IoSocialRedditOutline  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteRedditChange(e.target.value)} />
                </div>
                <div className='social-icon-div'>
                    <IoSocialTwitchOutline  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteTwitchTvChange(e.target.value)} />
                </div>
                <div className='social-icon-div'>
                    <IoPlaystation  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrtePlaystationChange(e.target.value)} />
                </div>
                <div className='social-icon-div'>
                    <IoXbox  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteXboxChange(e.target.value)} />
                </div>
            </form>  
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(SocialMediaForm);