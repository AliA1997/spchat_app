import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import fifaLogo from '../../../imgs/fifa-logo.png';
import laLigaLogo from '../../../imgs/la-liga-logo.png';
import premierLeagueLogo from '../../../imgs/premier-liga.png';
import mlbLogo from '../../../imgs/mlb-logo.png';
import nbaLogo from '../../../imgs/nba-logo.png';
import nhlLogo from '../../../imgs/nhl-logo.png';
import nflLogo from '../../../imgs/nfl-logo.png';
import skateBoardLogo from '../../../imgs/skateboarding-logo.jpg';
import snowBoardLogo from '../../../imgs/Snowboarding-logo.svg';
import bmxLogo from '../../../imgs/bmx-logo.jpg';
import skiingLogo from '../../../imgs/skiing-logo.jpg';
// import TiThSmall from 'react-icons/lib/ti/th-small';
import { logoutUser } from '../../../redux/reducers/userReducer';
import { connect } from 'react-redux';
import axios from 'axios';
//React Icons-----------
//Up and Down Icons 
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaSearch from 'react-icons/lib/fa/search';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import './Nav.css';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedFutbol: false,
            clickedOther: false,
            clickedHome: false,
            hamburgerClicked: false,
            clickedMobileSports: false,
            clickedSearch: false,
            searchString: '',
            randomIndex: props.currentUser && props.currentUser.favorite_teams && props.currentUser.favorite_teams.length ? Math.floor(Math.random() * props.currentUser.favorite_teams.length) : 0
            // logoIndex: Math.floor(Math.random() * props.currentUser.favorite_teams.length)
        }
    }
    componentDidMount() {
        this.setState({hamburgerClicked: false, clickedFutbol: false, clickedHome: false, clickedOther: false, searchString: ''});
    }
    linkFunc = (path) => {
        this.props.history.push(path);
        // this.setState(this.state);
        // this.props.history.go(path);
    }
    clickedAngleIcon(icon) {
        if(icon === 'clickedOther') {
            this.setState({
                clickedOther: !this.state.clickedOther,
                clickedMobileSports: false,
                clickedFutbol: false,
                clickedSearch: false, 
                clickedHome: false
            })
        } else if(icon === 'clickedFutbol') {
            this.setState({
                clickedFutbol: !this.state.clickedFutbol,
                clickedMobileSports: false,
                clickedHome: false,
                clickedSearch: false,
                clickedOther: false
            }) 
        } else if(icon === 'clickedSearch') {
            this.setState({
                clickedSearch: !this.state.clickedSearch,
                clickedMobileSports: false,
                clickedFutbol: false,
                clickedHome: false,
                clickedOther: false
            }) 
        } else if(icon === 'clickedMobileSports') {
            this.setState({
                clickedMobileSports: !this.state.clickedMobileSports,
                clickedSearch: false,
                clickedFutbol: false,
                clickedHome: false,
                clickedOther: false
            }) 
        } else {
            this.setState({
                clickedHome: !this.state.clickedHome,
                clickedMobileSports: false,
                clickedFutbol: false,
                clickedSearch: false,
                clickedOther: false
            })
        }
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
        const { clickedHome, clickedFutbol, clickedOther, clickedMobileSports, clickedSearch, hamburgerClicked, randomIndex } = this.state;
        const { currentUser } = this.props;
        const teamLogos = [fifaLogo, laLigaLogo, premierLeagueLogo, mlbLogo, nbaLogo, nhlLogo, nflLogo];
        const indexOfLogo = Math.floor(Math.random() * teamLogos.length);
        // console.log('Action method---------', this.props.history.action);
        // console.log('-------------index', this.state.logoIndex);
        
        return (
            <div className='nav'>
                <nav className='main-nav' style={{backgroundColor: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[0] : '#020',
                                                color: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[1] : '#fff'}}>
                    <ul>
                        {currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? 
                        <figure className='stage'>
                            <img className='ball' 
                            src={currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].logo} 
                            alt={currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].name}/>
                        </figure>
                        :
                        <figure className='stage'>
                            <img className='ball' src={teamLogos[indexOfLogo]} alt='Spchat-logo'/>
                        </figure>}
                        <li onClick={() => this.clickedAngleIcon('clickedSearch')}
                        className='nav-submenu-item search'>
                            <div className='nav-item other'><FaSearch style={{fontSize: '2em'}} /></div>{clickedSearch ? <FaAngleDown /> : <FaAngleUp />}
                            <ul className='submenu-nav' style={{display: clickedSearch ? 'inline-block' : 'none',
                            backgroundColor: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[0] : '#020',
                            color: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[1] : '#fff'}}>
                                    <li className='submenu-nav-item'>
                                        <NavLink to='/posts'>Posts</NavLink>
                                    </li>                            
                                    <li className='submenu-nav-item'>
                                        <NavLink to='/users'>Users</NavLink>
                                    </li>
                            </ul>
                        </li>
                        <li onClick={() => this.clickedAngleIcon('clickedHome')}
                        className='nav-submenu-item home'>
                            <div className='nav-item home' onClick={() => this.linkFunc('/')}>Home</div>{clickedHome ? <FaAngleDown /> : <FaAngleUp />}
                
                            <ul className='submenu-nav' style={{display: clickedHome ? 'inline-block' : 'none',
                            backgroundColor: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[0] : '#020',
                            color: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[1] : '#fff'}}>
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
                        <li  onClick={() => this.clickedAngleIcon('clickedFutbol')}
                        className='nav-submenu-item futbol'>
                            <div className='nav-item futbol'>Futbol</div>{clickedFutbol ? <FaAngleDown /> : <FaAngleUp />}
                            <ul className='submenu-nav' style={{display: clickedFutbol ? 'inline-block' : 'none', 
                            backgroundColor: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[0] : '#020',
                            color: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[1] : '#fff'}}>
                                    <li className='submenu-nav-item' onClick={() => this.linkFunc('/sports/premier-league')}>Premier League</li>
                                    <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/fifa`)}>FIFA</li>                            
                                    <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/la-liga`)}>La Liga</li>
                            </ul>
                        </li>
                        <li onClick={() => this.clickedAngleIcon('clickedOther')}
                        className='nav-submenu-item other'>
                            <div className='nav-item other'>Other</div>{clickedOther ? <FaAngleDown /> : <FaAngleUp />}
                            <ul className='submenu-nav' style={{display: clickedOther ? 'inline-block' : 'none', 
                            backgroundColor: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[0] : '#020',
                            color: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[1] : '#fff'}}>
                                <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/bmx`)}><img src={bmxLogo} alt={'BMX'} style={{height: '2em', width: '2em'}}/></li>
                                <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/skateboarding`)}><img src={skateBoardLogo} alt={'Skateboarding'} style={{height: '2em', width: '2em'}}/></li>     
                                <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/snowboarding`)}><img src={snowBoardLogo} alt={'Snowboarding'} style={{height: '2em', width: '2em'}}/></li>
                                <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/skiing`)}><img src={skiingLogo} alt={'Skiing'} style={{height: '2em', width: '2em'}}/></li>           
                            </ul>
                        </li>  
                        <li className='nav-item login-logout' onClick={() => currentUser ? this.logout() : this.linkFunc('/login')}>
                            {currentUser ? 'Logout' : 'Login'}
                        </li>
                    </ul>
                </nav>
                <nav className='mobile mobile-main-nav'  style={{backgroundColor:
                currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[0] : '#020',
                color: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[1] : '#fff'}}>
                    <div className='mobile mobile-main-nav-wrapper'>
                        <figure className='hamburger-icon-div' onClick={() => this.setState({hamburgerClicked: !this.state.hamburgerClicked})}>
                            {currentUser && currentUser.favorite_teams && currentUser.favorite_teams && currentUser.favorite_teams.length ? 
                            <figure className='stage'>
                                <img className='ball' 
                                src={currentUser && currentUser.favorite_teams && currentUser.favorite_teams[randomIndex].logo} 
                                alt={currentUser && currentUser.favorite_teams && currentUser.favorite_teams[randomIndex].name}/>
                            </figure>
                            :
                            <figure className='stage'>
                                <img className='ball' src={teamLogos[indexOfLogo]} alt='Spchat-logo'/>
                            </figure>}
                        </figure>
                        <div className='mobile mobile-main-nav-wrapper' style={{display: hamburgerClicked ? 'grid' : 'none'}}>
                        <li onClick={() => this.clickedAngleIcon('clickedSearch')}
                        className='nav-submenu-item search'>
                            <div className='mobile-nav-item search'><FaSearch style={{fontSize: '2em'}}/></div>{clickedSearch ?
                                <FaAngleDown  className='mobile-nav-icon'/> : <FaAngleUp  className='mobile-nav-icon'/>}
                            <ul className='submenu-nav' style={{display: clickedSearch ? 'inline-block' : 'none',
                            backgroundColor: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[0] : '#020',
                            color: currentUser && currentUser.favorite_teams && currentUser.favorite_teams.length && currentUser.favorite_teams[randomIndex].colors.length ? currentUser.favorite_teams[randomIndex].colors[1] : '#fff'}}>
                                <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc('/posts')}>
                                    <p>Posts</p>
                                </li>                            
                                <li className='mobile-submenu-nav-item' onClick={() => this.linkFunc('/users')}>
                                    <p>Users</p>
                                </li>
                            </ul>
                            </li>  
                            <li onClick={() => this.clickedAngleIcon('clickedHome')}
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
                            <li  className='mobile-nav-submenu-item home'>
                                <div className='mobile-nav-item sports' onClick={() => this.clickedAngleIcon('clickedMobileSports')} >Sports</div>
                                {clickedMobileSports ?  <FaAngleDown  className='mobile-nav-icon'/> : <FaAngleUp  className='mobile-nav-icon'/>}
                                <ul className='mobile-submenu-nav' style={{display: clickedMobileSports ? 'inline-block' : 'none'}}>
                                    <li className='mobile-nav-item mlb' onClick={() => this.linkFunc('/sports/mlb')}>MLB</li>
                                    <li className='mobile-nav-item nba' onClick={() => this.linkFunc('/sports/nba')}>NBA</li>
                                    <li className='mobile-nav-item nfl' onClick={() => this.linkFunc('/sports/nfl')}>NFL</li>
                                    <li className='mobile-nav-item nhl' onClick={() => this.linkFunc('/sports/nhl')}>NHL</li>
                                    <li  onClick={() => this.clickedAngleIcon('clickedFutbol')}
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
                                    <li onClick={() => this.clickedAngleIcon('clickedOther')}
                                    className='mobile-nav-submenu-item other'>
                                        <div className='mobile-nav-item other'>Other</div>{clickedOther ? <FaAngleDown className='mobile-nav-icon' /> 
                                        : <FaAngleUp  className='mobile-nav-icon' />}
                                        <ul className='mobile-submenu-nav' style={{display: clickedOther ? 'inline-block' : 'none'}}>
                                            <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/bmx`)}><img src={bmxLogo} alt={'BMX'} style={{height: '2em', width: '2em'}}/></li>
                                            <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/skateboarding`)}><img src={skateBoardLogo} alt={'Skateboarding'} style={{height: '2em', width: '2em'}}/></li>     
                                            <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/snowboarding`)}><img src={snowBoardLogo} alt={'Snowboarding'} style={{height: '2em', width: '2em'}}/></li>
                                            <li className='submenu-nav-item' onClick={() => this.linkFunc(`/sports/skiing`)}><img src={skiingLogo} alt={'Skiing'} style={{height: '2em', width: '2em'}}/></li>              
                                        </ul>
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
        currentUser: state.user.currentUser
    }
};

export default withRouter(connect(mapStateToProps)(Nav));