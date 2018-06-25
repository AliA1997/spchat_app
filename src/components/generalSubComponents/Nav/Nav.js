import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Search from '../Search/Search';
import TiThSmall from 'react-icons/lib/ti/th-small';
import { logoutUser } from '../../../redux/reducers/userReducer';
import { getSearch } from '../../../redux/reducers/searchReducer';
import { connect } from 'react-redux';
import axios from 'axios';
//React Icons-----------
//Up and Down Icons 
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import './Nav.css';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedFutbol: false,
            clickedOther: false,
            clickedHome: false,
            searchPosts: [],
            hamburgerClicked: false,
            // logoIndex: Math.floor(Math.random() * props.currentUser.favorite_teams.length)
        }
    }
    componentDidMount() {
        this.setState({hamburgerClicked: false, clickedFutbol: false, clickedHome: false, clickedOther: false});
    }
    linkFunc = (path) => {
        this.props.history.push(path);
        // this.setState(this.state);
        // this.props.history.go(path);
    }
    logout() {
        const { dispatch } = this.props;
        axios.post('/api/logout')
        .then(res => {
            dispatch(logoutUser());
            console.log(res.data.message);
        }).catch(err => console.log('Axios Post Error---------', err));
    }
    search = (val) => {
        const { dispatch } = this.props;
        if(window.location.href === `${window.location.origin}/users`) {
            console.log('Users search hit-----------');
            axios.get(`/api/search/users?user=${val}`)
            .then(res => {
                console.log('Users search ---------', res.data.users);
                dispatch(getSearch(val, res.data.users));
                console.log('Users search Items ----', this.props.searchItems);
            }).catch(err => console.log('Axios get searchUsers--------', err));
        } else if(window.location.href.includes(`${window.location.origin}/sports`)) {
            const sport = window.location.href.split('/');
            // console.log(sport[4]);
            // console.log('values------------', val);
            console.log('Sports Search hit------------');
            axios.get(`/api/search/sports?sport=${sport[4]}&post=${val}`)
            .then(res => {
                console.log('postss------------------', res.data.posts);
                dispatch(getSearch(val, res.data.posts));
            }).catch(err => console.log('Axios sports-search error---------', err));
        }else {
            console.log('Search hit---------------');
            axios.get(`/api/search/posts?post=${val}`)
            .then(res => {
                console.log('Posts of search-------------', res.data.posts);
                dispatch(getSearch(val, res.data.posts));
                console.log('Posts of search-------------', this.props.searchItems);                        
            }).catch(err => console.log('Axios get searchPosts--------', err));
        }
    }
    render() {
        const { clickedHome, clickedFutbol, clickedOther, hamburgerClicked, searchPosts } = this.state;
        const { currentUser } = this.props;
        // console.log('Action method---------', this.props.history.action);
        console.log('-------------index', this.state.logoIndex);
        return (
            <div className='nav'>
                <nav className='main-nav'>
                    <ul>
                        <div className='stage'>
                            <figure className='ball'><span className='shadow'></span></figure>
                        </div>
                        <div className='search-bar'>
                            <Search linkFunc={this.linkFunc} search={this.search} searchPosts={searchPosts}/>
                        </div>
                        <li onClick={() => this.setState({clickedHome: !this.state.clickedHome})}
                        className='nav-submenu-item home'>
                            <div className='nav-item home' onClick={() => this.linkFunc('/')}>Home</div>{clickedHome ? <FaAngleDown /> : <FaAngleUp />}
                
                            <ul className='submenu-nav' style={{display: clickedHome ? 'inline-block' : 'none'}}>
                                    <li className='submenu-nav-item'>
                                        <NavLink to='/dashboard/create-post'>Create Post</NavLink>
                                    </li>                            
                                    <li className='submenu-nav-item'>
                                        <NavLink to='/dashboard'>My Dashboard</NavLink>
                                    </li>
                                    <li className='submenu-nav-item'>
                                        <NavLink to='/dashboard/favorite-news'>Player Or Team News</NavLink>
                                    </li>
                            </ul>
                        </li>
                        <li className='nav-item mlb' onClick={() => this.linkFunc('/sports/mlb')}>MLB</li>
                        <li className='nav-item nba' onClick={() => this.linkFunc('/sports/nba')}>NBA</li>
                        <li className='nav-item nfl' onClick={() => this.linkFunc('/sports/nfl')}>NFL</li>
                        <li className='nav-item nhl' onClick={() => this.linkFunc('/sports/nhl')}>NHL</li>
                        <li  onClick={() => this.setState({clickedFutbol: !this.state.clickedFutbol})}
                        className='nav-submenu-item futbol'>
                            <div className='nav-item futbol'>Futbol</div>{clickedFutbol ? <FaAngleDown /> : <FaAngleUp />}
                            <ul className='submenu-nav' style={{display: clickedFutbol ? 'inline-block' : 'none'}}>
                                    <li className='submenu-nav-item' onClick={() => this.linkFunc('/sports/premier-league')}>Premier League</li>
                                    <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/fifa`)}>FIFA</li>                            
                                    <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/la-liga`)}>La Liga</li>
                            </ul>
                        </li>
                        <li onClick={() => this.setState({clickedOther: !this.state.clickedOther})}
                        className='nav-submenu-item other'>
                            <div className='nav-item other'>Other</div>{clickedOther ? <FaAngleDown /> : <FaAngleUp />}
                            <ul className='submenu-nav' style={{display: clickedOther ? 'inline-block' : 'none'}}>
                                <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/bmx`)}>BMX</li>
                                <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/skateboarding`)}>Skateboarding</li>     
                                <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/snowboarding`)}>Snowboarding</li>
                                <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/skiing`)}>Skiing</li>           
                            </ul>
                        </li>  
                        <li className='nav-item login-logout' onClick={() => currentUser ? this.logout() : this.linkFunc('/login')}>
                            {currentUser ? 'Logout' : 'Login'}
                        </li>
                    </ul>
                </nav>
                <nav className='mobile mobile-main-nav'>
                    <div className='mobile mobile-main-nav-wrapper'>
                        <figure className='hamburger-icon-div' onClick={() => this.setState({hamburgerClicked: !this.state.hamburgerClicked})}>
                                {/* <img className='hamburger-icon' 
                                // src={currentUser && currentUser.favorite_teams[this.state.logoIndex].logo || '../../../imgs/spchat-logo.png'} /> */}
                        </figure>
                        <div className='mobile mobile-main-nav-wrapper' style={{display: hamburgerClicked ? 'grid' : 'none'}}>
                            <div className='mobile-search-bar'>
                                <Search linkFunc={this.linkFunc} search={this.search} searchPosts={searchPosts}/>
                            </div>
                            <li onClick={() => this.setState({clickedHome: !this.state.clickedHome})}
                                className='mobile-nav-submenu-item home'>
                                <div className='mobile-nav-item home' onClick={() => this.linkFunc('/')}>Home</div>{clickedHome ?
                                    <FaAngleDown  className='mobile-nav-icon'/> : <FaAngleUp  className='mobile-nav-icon'/>}
                    
                                <ul className='mobile-submenu-nav' style={{display: clickedHome ? 'inline-block' : 'none'}}>
                                        <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc('/dashboard/create-post')}>
                                            <p>Create Post</p>
                                        </li>                            
                                        <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc('/dashboard')}>
                                            <p>My Dashboard</p>
                                        </li>
                                        <li className='submenu-nav-item' onClick={() => this.linkFunc('/dashboard/favorite-news')}>
                                            <p>Player Or Team News</p>
                                        </li>
                                </ul>
                            </li>
                            <li className='mobile-nav-item mlb' onClick={() => this.linkFunc('/sports/mlb')}>MLB</li>
                            <li className='mobile-nav-item nba' onClick={() => this.linkFunc('/sports/nba')}>NBA</li>
                            <li className='mobile-nav-item nfl' onClick={() => this.linkFunc('/sports/nfl')}>NFL</li>
                            <li className='mobile-nav-item nhl' onClick={() => this.linkFunc('/sports/nhl')}>NHL</li>
                            <li  onClick={() => this.setState({clickedFutbol: !this.state.clickedFutbol})}
                                className='mobile-nav-submenu-item futbol'>
                                <div className='mobile-nav-item futbol'>Futbol</div>{clickedFutbol ?
                                    <FaAngleDown className='mobile-nav-icon'/> : <FaAngleUp className='mobile-nav-icon'/>}<br/>
                                <ul className='mobile-submenu-nav' style={{display: clickedFutbol ? 'inline-block' : 'none'}}>
                                    <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc('/sports/premier-league')}>
                                        <p>Premier League</p>
                                    </li>
                                    <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/fifa`)}>
                                        <p>FIFA</p>
                                    </li>                            
                                    <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/la-liga`)}>
                                        <p>La Liga</p>
                                    </li>
                                </ul>
                            </li>
                            <li onClick={() => this.setState({clickedOther: !this.state.clickedOther})}
                            className='mobile-nav-submenu-item other'>
                                <div className='mobile-nav-item other'>Other</div>{clickedOther ? <FaAngleDown className='mobile-nav-icon' /> 
                                : <FaAngleUp  className='mobile-nav-icon' />}
                                <ul className='mobile-submenu-nav' style={{display: clickedOther ? 'inline-block' : 'none'}}>
                                    <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/bmx`)}>
                                        <p>BMX</p>
                                    </li>
                                    <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/skateboarding`)}>
                                        <p>Skateboarding</p>
                                    </li>     
                                    <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/snowboarding`)}>
                                        <p>Snowboarding</p>
                                    </li>
                                    <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/skiing`)}>
                                        <p>Skiing</p>
                                    </li>           
                                </ul>
                            </li>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchItems: state.search.searchItems,
        currentUser: state.user.currentUser
    }
};

export default withRouter(connect(mapStateToProps)(Nav));