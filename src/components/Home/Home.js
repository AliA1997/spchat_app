import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from '../Posts/Posts';
// import SlickSlideshow from '../SlideImages/SlideImages';
import { logoutUser, userFinishedRegistered } from '../../redux/reducers/userReducer';
import UserPopup from './UserPopup/UserPopup';
import Popup from '../generalSubComponents/Popup/Popup';
import Survey from '../generalSubComponents/Survey/Survey';
import Loader from '../generalSubComponents/Loader/Loader';
import { NavLink } from 'react-router-dom';
import './Home.css';
import Slideshow from '../generalSubComponents/Slideshow/Slideshow';
// import uuid from 'uuid';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            posts: [],
            recentPosts: [],
            survey: null
        }
    }
    componentDidMount() {
        const recentPostsAxiosRequest = axios.get('/api/recent-posts');
        const postsAxiosRequest = axios.get('/api/posts');
        const surveyAxiosRequest = axios.get('/api/survey');
        Promise.all([postsAxiosRequest, surveyAxiosRequest, recentPostsAxiosRequest]).then(res => {
            this.setState({posts: res[0].data.posts, survey: res[1].data.survey, recentPosts: res[2].data.posts, loading: false})
        }).catch(err => console.log('Axios all error-----------', err));
    }
    linkFunc = (path) => {
        return this.props.history.push(path);
    }
    logout() {
        const { dispatch } = this.props;
        axios.post('/api/logout')
        .then(res => {
            dispatch(logoutUser());
            console.log(res.data.message);
        }).catch(err => console.log('Axios Post Error---------', err));
    }
    render() {
        const { currentUser, registeredUser } = this.props;
        const { loading, posts, recentPosts, survey } = this.state;
        let displayPosts = recentPosts.map(post => {
            return {imageurl: post.image, title: post.title, link: `/posts/${post.sport}/${post.id}`}
        });
        if(!loading) {
            if(registeredUser) {
                setTimeout(() => {
                    const { dispatch  } = this.props;
                    dispatch(userFinishedRegistered());
                }, 5000);
                return <Popup>
                            <UserPopup {...registeredUser}/>
                        </Popup>
            }
            return (
                <div className='home-div'>
                    <div className='home-slideshow-div'>
                        <Slideshow slides={displayPosts} linkFunc={this.linkFunc} isHome={true}/>
                    </div>
                    <div style={{fontSize: '2.25em', marginRight: 'auto', marginLeft: 'auto', textAlign: 'center', 
                     marginTop: '50px', width: '100%'}}>Recent Posts</div>
                    <div className='home-recent-posts-div'>
                            <Posts posts={posts}/>
                    </div>
                    <div className='home-subdiv'>
                        <div className='home-stats-div'> 
                            <h3>Stats</h3>
                            <p>Stats....?</p>
                        </div>
                        <div className='home-survey-div'> 
                            <Survey survey={survey}/>
                        </div>
                        <div className='home-login-div'>
                            {currentUser 
                            ? <button className='home-logout-link' onClick={() => this.logout()}>Logout</button> 
                            : <div className='home-login-subdiv'>
                                <NavLink className='home-login-link' to='/login'>Login</NavLink>
                                <NavLink className='home-register-link' to={`/register`}>Register</NavLink>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }
}

const mapStateToProps = state => {
    return {
        registeredUser: state.user.registeredUser,
        currentUser: state.user.currentUser
    }
}
export default withRouter(connect(mapStateToProps)(Home));