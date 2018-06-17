import React, { Component } from 'react';
// import Nav from '../generalSubComponents/Nav/Nav';
// import Nav from '../generalSubComponents/Nav/Nav';
import Posts from '../Posts/Posts';
import Slideshow from '../generalSubComponents/Slideshow/Slideshow';
import Survey from '../generalSubComponents/Survey/Survey';
import Loader from '../generalSubComponents/Loader/Loader';
import { NavLink } from 'react-router-dom';
import './Home.css';
import uuid from 'uuid';
import axios from 'axios';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            posts: [],
            survey: null
        }
    }
    componentDidMount() {
        const postsAxiosRequest = axios.get('/api/posts');
        const surveyAxiosRequest = axios.get('/api/survey/1');
        Promise.all([postsAxiosRequest, surveyAxiosRequest]).then(res => {
            this.setState({posts: res[0].data.posts, survey: res[1].data.survey, loading: false})
        }).catch(err => console.log('Axios all error-----------', err));
    }
    render() {
        const { loading, posts, survey } = this.state;
        if(!loading) {
            return (
                <div className='home-div'>
                    <div className='home-slideshow-div'>
                        <Slideshow />
                    </div>
                    <div className='home-recent-posts-div'>
                            <h3>Recent Posts</h3>
                            <Posts posts={posts}/>
                    </div>
                    <div className='home-subdiv'>
                        <div className='home-survey-div'> 
                            <h3>Stats</h3>
                            <p>Stats....?</p>
                        </div>
                        <div className='home-survey-div'> 
                            <Survey survey={survey}/>
                        </div>
                        <div className='home-login-div'>
                            <div className='home-login-subdiv'>
                                <NavLink className='home-login-link' to='/login'>Login</NavLink>
                                <NavLink className='home-register-link' to={`/register/${uuid.v4()}`}>Register</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }
}