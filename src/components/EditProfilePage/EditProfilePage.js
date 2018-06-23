import React, { Component } from 'react';
import Form from '../generalSubComponents/Form/Form';
import SocialMediaForm from '../userSubComponents/SocialMediaForm/SocialMediaForm';
import { connect } from 'react-redux';
import './EditProfilePage.css';

class EditProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            socialMediaClicked: false,
        }
    }
    render() {
        const { socialMediaClicked } = this.state;
        return (
            <div className='edit-profile-container' >
                Edit Profile
                <div className='edit-profile-wrapper'>
                    <Form forEdit={true}/>
                </div>
                <button onClick={() => this.setState({socialMediaClicked: !this.state.socialMediaClicked})}>Social Media</button>
                <div className='edit-profile-social-media-wrapper' style={{display: socialMediaClicked ? 'inline-block' : 'none'}}>
                    <div>
                    <p>Edit Social Media</p>
                    <SocialMediaForm />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(EditProfilePage)