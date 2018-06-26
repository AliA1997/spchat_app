import React, { Component } from 'react';
// import IoSocialTwitter from 'react-icons/lib/io/social-twitter';
// import IoSocialFacebook from 'react-icons/lib/io/social-facebook';
// import IoSocialInstagram from 'react-icons/lib/io/social-instagram';
// import IoSocialSnapchat from 'react-icons/lib/io/social-snapchat';
// import IoSocialReddit from 'react-icons/lib/io/social-reddit';
// import IoSocialTwitch from 'react-icons/lib/io/social-twitch';
// import IoPlaystation from 'react-icons/lib/io/playstation';
// import IoXbox from 'react-icons/lib/io/xbox';
import './SocialMediaSection.css';
import { connect } from 'react-redux';

class SocialMediaSection extends Component {
    render() {
        const { currentUser } = this.props;
        console.log('currentUser Social media---------------', currentUser)
        return (
            <div>
                Social Media Section
                {/* {currentUser && currentUser.social_media.map((item, i) => {
                    if(item.includes('twitter')) return <IoSocialTwitter key={i} className='dashboard-social-icons'/>
                    else if(item.includes('facebook')) return <IoSocialFacebook key={i} className='dashboard-social-icons'/>
                    else if(item.includes('instagram')) return <IoSocialInstagram key={i}className='dashboard-social-icons'/>
                    else if(item.includes('snapchat')) return <IoSocialSnapchat key={i} className='dashboard-social-icons'/>
                    else if(item.includes('twitch')) return <IoSocialTwitch key={i} className='dashboard-social-icons'/>
                    else if(item.includes('reddit')) return <IoSocialReddit key={i} className='dashboard-social-icons'/>
                    else if(item.includes('playstation')) return <IoPlaystation key={i} className='dashboard-social-icons'/>
                    else if(item.includes('xbox')) return <IoXbox className='dashboard-social-icons'/>
                    else return <p></p>
                })} */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(SocialMediaSection);