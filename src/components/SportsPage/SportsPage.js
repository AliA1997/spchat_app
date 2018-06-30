import React, { Component } from 'react';
import axios from 'axios';
import Posts from '../Posts/Posts';
import News from '../generalSubComponents/News/News';
import Survey from '../generalSubComponents/Survey/Survey';
import Loader from '../generalSubComponents/Loader/Loader';
//All Sports Logos
import nbaLogo from '../../imgs/nba-logo.png';
import mlbLogo from '../../imgs/mlb-logo.png';
import nflLogo from '../../imgs/nfl-logo.png';
import nhlLogo from '../../imgs/nhl-logo.png';
import fifaLogo from '../../imgs/fifa-logo.png';
import laLigaLogo from '../../imgs/la-liga-logo.png';
import premierLeagueLogo from '../../imgs/premier-liga.png';
import bmxLogo from '../../imgs/bmx-logo.jpg';
import snowboardingLogo from '../../imgs/Snowboarding-logo.svg';
import skateboardingLogo from '../../imgs/skateboarding-logo.jpg';
import skiingLogo from '../../imgs/skiing-logo.jpg';

import './SportsPage.css';
// import { connect } from 'net';
export const SportHOC = (sport) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                sportPosts: [],
                currentImg: null,
                survey: null,
                stats: 'stats...........',
                loading: true
            }
            this.imgs = [ 
                {img: nbaLogo, sport: 'nba'}, 
                {img: mlbLogo, sport: 'mlb'},
                {img: nflLogo, sport: 'nfl'},
                {img: nhlLogo, sport: 'nhl'}, 
                {img: fifaLogo, sport: 'fifa'},
                {img: laLigaLogo, sport: 'la-liga'}, 
                {img: premierLeagueLogo, sport: 'premier-league'}, 
                {img: skateboardingLogo, sport: 'skateboarding'},
                {img: snowboardingLogo, sport: 'snowboarding'},
                {img: skiingLogo, sport: 'skiing'},
                {img: bmxLogo, sport: 'bmx'}
            ];
        }
        componentDidMount() {
            this.setState(this.state);
            let filterArr = this.imgs.filter(img => img.sport === sport);
            this.setState({currentImg: filterArr[0]});
            // console.log('Component Did Mount---------- and sport params--------', this.props.match.params.sport);
            // axios.get(`/api/posts/sports/${this.props.match.params.sport}`)
            // .then(res => {
            //     this.setState({sportPosts: res.data.posts});
            // }).catch(err => console.log('Get Sports Post Axios Error--------', err));
            let sportId = null;
            if(sport === 'la-liga') {
                 sportId = 'La Liga';
            } else if(sport === 'premier-league') {
                 sportId = 'Premier League';
            } else if(sport === 'snowboarding') {
                 sportId = 'Snowboarding';
            } else if(sport === 'skateboarding') {
                sportId = 'Skateboarding';
            } else if(sport === 'skiing') {
                sportId = 'Skiing';
            } else {
                 sportId =  sport.toUpperCase();
            }
            const postsAxiosCall = axios.get(`/api/posts/sports/${sport}`);
            const surveyAxiosCall = axios.get(`/api/survey/${sportId}`);
            Promise.all([postsAxiosCall, surveyAxiosCall])
            .then(res => {
                this.setState({sportPosts: res[0].data.posts, survey: res[1].data.survey, loading: false})
            }).catch(err => console.log('Axios All Error-----------', err));
        }

        render() {
            const { sportPosts, currentImg, survey, stats, loading } = this.state;
            console.log('Current Image--------', currentImg);
            if(!loading) {
                return (
                    <div className='sports-page-container'>
                        <div className='sports-page-wrapper'>
                            <img className='sports-logo' src={currentImg && currentImg.img} 
                            alt={`${currentImg && currentImg.sport}-logo`} />
                            <News title={sport}/>
                            <div className='sports-page-posts'>
                                {sportPosts && <Posts sportsPosts={sportPosts} loading={loading} />}
                            </div>
                            <div className='sports-page-last-div'>
                                <div className='survey-div sports-subdiv'>
                                    <Survey survey={survey}/>
                                </div>
                                <div className='sports-stats-div sports-subdiv'>
                                    {JSON.stringify(stats)}
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
}

// const mapStateToProps = state => {
//     return {
//         doSearch: state.doSearch
//     };
// }

// export default connect(mapStateToProps)(SportsPage);


