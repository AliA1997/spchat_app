import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Search from '../Search/Search';
import { getSearch, doneSearch } from '../../../redux/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
//React Icons-----------
//Up and Down Icons 
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import './Nav.css';

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            clickedFutbol: false,
            clickedOther: false,
            clickedHome: false,
            searchPosts: []
        }
    }
    linkFunc = (path) => {
        this.props.history.push(path);
        // this.setState(this.state);
        // this.props.history.go(path);
    }
    search = (val) => {
        const { dispatch } = this.props;
        dispatch(doneSearch());
        if(window.location.href === 'http://localhost:3000/users') {
            console.log('Users search hit-----------');
            axios.get(`/api/search/users?user=${val}`)
            .then(res => {
                console.log('Users search ---------', res.data.users);
                dispatch(getSearch(res.data.users));
                console.log('Users search Items ----', this.props.searchItems);
            }).catch(err => console.log('Axios get searchUsers--------', err));
        } else if(window.location.href.includes('http://localhost:3000/sports')) {
            const sport = window.location.href.split('/');
            // console.log(sport[4]);
            // console.log('values------------', val);
            console.log('Sports Search hit------------');
            axios.get(`/api/search/sports?sport=${sport[4]}&post=${val}`)
            .then(res => {
                console.log('postss------------------', res.data.posts);
                dispatch(getSearch(res.data.posts));
            }).catch(err => console.log('Axios sports-search error---------', err));
        }else {
            console.log('Search hit---------------');
            axios.get(`/api/search/posts?post=${val}`)
            .then(res => {
                console.log('Posts of search-------------', res.data.posts);
                dispatch(getSearch(res.data.posts));
                console.log('Posts of search-------------', this.props.searchItems);                        
            }).catch(err => console.log('Axios get searchPosts--------', err));
        }
    }
    render() {
        const { clickedHome, clickedFutbol, clickedOther, searchPosts } = this.state;
        const { currentUser } = this.props;
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
                                        <NavLink to='/dashboard/account'>Account</NavLink>
                                    </li>
                                    <li className='submenu-nav-item'>
                                        <NavLink to='/dashboard/create-post'>Create Post</NavLink>
                                    </li>                            
                                    <li className='submenu-nav-item'>
                                        <NavLink to='/dashboard'>My Dashboard</NavLink>
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
                        <li className='nav-item login-logout' onClick={() => this.linkFunc('/login')}>{currentUser ? 'Logout' : 'Login'}</li>
                    </ul>
                </nav>
                <nav className='mobile mobile-main-nav'>
                    <div className='mobile-search-bar'><Search search={this.search} searchPosts={searchPosts}/></div>
                    <li onClick={() => this.setState({clickedHome: !this.state.clickedHome})}
                        className='mobile-nav-submenu-item home'>
                        <div className='mobile-nav-item home' onClick={() => this.linkFunc('/')}>Home</div>{clickedHome ? <FaAngleDown /> : <FaAngleUp />}
            
                        <ul className='mobile-submenu-nav' style={{display: clickedHome ? 'inline-block' : 'none'}}>
                                <li className='mobile-submenu-nav-item'>
                                    <NavLink to='/dashboard/account'>Account</NavLink>
                                </li>
                                <li className='mobile-submenu-nav-item'>
                                    <NavLink to='/dashboard/create-post'>Create Post</NavLink>
                                </li>                            
                                <li className='mobile-submenu-nav-item'>
                                    <NavLink to='/dashboard'>My Dashboard</NavLink>
                                </li>
                        </ul>
                    </li>
                    <li className='mobile-nav-item' onClick={() => this.linkFunc('/sports/mlb')}>MLB</li>
                    <li className='mobile-nav-item' onClick={() => this.linkFunc('/sports/nba')}>NBA</li>
                    <li className='mobile-nav-item' onClick={() => this.linkFunc('/sports/nfl')}>NFL</li>
                    <li className='mobile-nav-item' onClick={() => this.linkFunc('/sports/nhl')}>NHL</li>
                    <li  onClick={() => this.setState({clickedFutbol: !this.state.clickedFutbol})}
                        className='mobile-nav-submenu-item futbol'>
                        <div className='mobile-nav-item futbol'>Futbol</div>{clickedFutbol ? <FaAngleDown /> : <FaAngleUp />}
                        <ul className='mobile-submenu-nav' style={{display: clickedFutbol ? 'inline-block' : 'none'}}>
                                <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc('/sports/premier-league')}>Premier League</li>
                                <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/fifa`)}>FIFA</li>                            
                                <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/la-liga`)}>La Liga</li>
                        </ul>
                    </li>
                    <li onClick={() => this.setState({clickedOther: !this.state.clickedOther})}
                    className='mobile-nav-submenu-item other'>
                        <div className='mobile-nav-item other'>Other</div>{clickedOther ? <FaAngleDown /> : <FaAngleUp />}
                        <ul className='mobile-submenu-nav' style={{display: clickedOther ? 'inline-block' : 'none'}}>
                            <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/bmx`)}>BMX</li>
                            <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/skateboarding`)}>Skateboarding</li>     
                            <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/snowboarding`)}>Snowboarding</li>
                            <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc(`/sports/skiing`)}>Skiing</li>           
                        </ul>
                    </li>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchItems: state.searchItems,
        currentUser: state.currentUser
    }
};

export default withRouter(connect(mapStateToProps)(Nav));