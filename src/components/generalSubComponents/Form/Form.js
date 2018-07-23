import React, { Component } from 'react';
import FaPlus from 'react-icons/lib/fa/plus';
import TeamCard from '../../userSubComponents/TeamCard/TeamCard';
import PlayerCard from '../../userSubComponents/PlayerCard/PlayerCard';
import Popup from '../Popup/Popup';
import { loginUser } from '../../../redux/reducers/userReducer';
import { getTime } from '../../../logic';
import { connect } from 'react-redux';
import sportsOptions from '../../../sports-data/sports-options.json';
import nbaTeams from '../../../sports-data/nba-teams.json';
import nbaPlayers from '../../../sports-data/nba-players.json';
import './Form.css';
import axios from 'axios';

const filterNullValues = (obj, obj2) => {
    for(let key in obj) {
        if(!obj[key]) {
            obj[key] = obj2[key];
        }
    }
    return obj;
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            image: '',
            password: '',
            favoriteTeams: props.forEdit ? props.currentUser.favorite_teams : [],
            favoritePlayers: props.forEdit ? props.currentUser.favorite_players : [],
            favoriteSport: '',
            age: '',
            currentPlayer: '',
            currentTeam: '',
            teams: nbaTeams,
            players: nbaPlayers,   
            sports: sportsOptions                               
        }
    }

    deletePlayer(playerName) {
        //Copy the array 
        let copyOfArr = this.state.favoritePlayers.slice();
        const playerIndex = copyOfArr.findIndex(player => player.name === playerName);
        copyOfArr.splice(playerIndex, 1);
        this.setState({favoritePlayers: copyOfArr, currentPlayer: ''});
    }
    deleteTeam(teamName) {
        //Copy the array 
        let copyOfArr = this.state.favoriteTeams.slice();
        const teamIndex = copyOfArr.findIndex(team => team.name === teamName);
        copyOfArr.splice(teamIndex, 1);
        this.setState({favoriteTeams: copyOfArr, currentTeam: ''});
    }
    handleCurrentPlayer(val) {
        this.setState({currentPlayer: val});
    }
    handleCurrentTeam(val) {
        this.setState({currentTeam: val});
    }
    hanRegUsername(val) {
        this.setState({username: val});
    }
    hanRegEmail(val) {
        this.setState({email: val});
    }
    hanRegPassword(val) {
        this.setState({password: val});
    }
    hanRegAge(val) {
        let DOB = +val.split('-').slice(0, 1)[0];
        console.log('--------------------age', (2018 - DOB));
        this.setState({age: (2018 - DOB)});
    }   
    hanRegFavTeams(e) {
        e.preventDefault();
        // console.log('FavTeams hit---------')
        const concattedValue = nbaTeams.filter(team => team.name === this.state.currentTeam)[0];
        // console.log(concattedValue);
        const copyOfFavTeams = this.state.favoriteTeams.slice();
        this.setState({favoriteTeams: copyOfFavTeams.concat(concattedValue)});
    }    

    hanRegFavPlayers(e) {
        e.preventDefault();
        // console.log('FavTeams hit---------')
        const copyOfFavPlayers = this.state.favoritePlayers.slice();
        const concattedValue = nbaPlayers.filter(player => player.name === this.state.currentPlayer)[0]
        this.setState({favoritePlayers: copyOfFavPlayers.concat(concattedValue), currentPlayer: ''});
    }    

    hanRegFavSport(val) {
        this.setState({favoriteSport: val});
    }    
    
    handleImageUpload(files){

        //axios call to server to request hashed signature
        console.log('file', files)
        console.log('files', files[0])
        axios.get('/api/upload').then(response => {
            console.log(response.data)
        
        //form data for signed uploads

        let formData = new FormData();
        formData.append("signature", response.data.payload.signature)
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
        formData.append("timestamp", response.data.payload.timestamp)
        formData.append("file", files[0]);

        for(var pair of formData.entries()) {
            console.log(pair); 
         }

        //axios call to cloudinary using the URL set at top 
            axios.post('https://api.cloudinary.com/v1_1/alia1997/image/upload', formData).then(response => {
                console.log(response.data);

                // Setting state with the secure_url
                this.setState({
                    image: response.data.secure_url
                })
            }).catch( err => {
                console.log(err);
            }) 
        })
    }     
    register() {
        const date = getTime();
        const { username, email, image, password, age, favoriteTeams, favoritePlayers, favoriteSport } = this.state;
        const { dispatch } = this.props;
        axios.post('/api/register', { username, email, image, password, age, date, favoriteTeams, favoritePlayers, favoriteSport })
        .then(res => {
            if(res.data.user) {
                alert(res.data.message);
                dispatch(loginUser(res.data.user));
            }
        }).catch(err => console.log('Axios Post Error-------------', err));
        this.props.redirect();
    }
    updateProfile(e) {
        e.preventDefault();
        const { currentUser, dispatch } = this.props;
        const { username, email, image, age, favoriteTeams, favoritePlayers, favoriteSport } = this.state;
        const updatedDate = getTime() + '(Last Updated)';
        let newObj = filterNullValues({ id: currentUser.id, username, email, updatedDate, image, age, favoriteTeams, favoritePlayers, favoriteSport }, currentUser);
        console.log('Filtered objefct----------', newObj);
        axios.put('/api/users', newObj)
        .then(res => {
            console.log('fucking edit profiel-----', res.data.user)
            dispatch(loginUser(res.data.user));
            alert(res.data.message);
            this.props.redirect('/dashboard');
        }).catch(err => console.log('Axios Put Error--------', err));
    }
    addToFavPlayers(e) {
        e.preventDefault();
        const { currentUser } = this.props;
        const { currentPlayer } = this.state;
        const copyOfArr = this.state.favoritePlayers.slice();
        const addedPlayer = nbaPlayers.filter(player => player.name === currentPlayer)[0];
        copyOfArr.push(addedPlayer);
        // console.log('Added Player---------', addedPlayer);
        this.setState({favoritePlayers: copyOfArr});
        axios.patch(`/api/users/${currentUser.id}/add_player`, {newPlayer: addedPlayer})
        .then(res => {
            alert(res.data.message);
            this.setState({currentPlayer: ''});
        }).catch(err => console.log('Axios Patch Error----------', err));
    }
    addToFavTeams(e) {
        e.preventDefault();
        const { currentUser } = this.props;
        const { currentTeam } = this.state;
        const copyOfArr = this.state.favoriteTeams.slice();
        const addedTeam = nbaTeams.filter(team => team.name === currentTeam)[0];
        copyOfArr.push(addedTeam);
        // console.log('addedTeam-------------', addedTeam);
        this.setState({favoriteTeams: copyOfArr});
        axios.patch(`/api/users/${currentUser.id}/add_team`, {newTeam: addedTeam})
        .then(res => {
            alert(res.data.message);
            this.setState({currentTeam: ''});
        }).catch(err => console.log('Axios Patch Error----------', err));
    }
    removePlayers(playerName) {
        const {currentUser} = this.props;
        const playerToRemove = nbaPlayers.filter(player => player.name === playerName)[0];
        const copyOfArr = this.state.favoritePlayers.slice();
        const playerIndex = copyOfArr.findIndex(player => player.name === playerName);
        copyOfArr.splice(playerIndex, 1);
        this.setState({favoritePlayers: copyOfArr});
        console.log('playerToRemove--------------', playerToRemove);
        axios.patch(`/api/users/${currentUser.id}/remove_player`, {playerToRemove})
        .then(res => {
            alert(res.data.message);
        }).catch(err => console.log('Remove Axios Player Patch Error!!', err));
    }
    removeTeams(teamName) {
        const { currentUser } = this.props;
        const teamToRemove = nbaTeams.filter(team => team.name === teamName)[0];
        const copyOfArr = this.state.favoriteTeams.slice();
        const teamIndex = copyOfArr.findIndex(team => team.name === teamName);
        copyOfArr.splice(teamIndex, 1);
        this.setState({favoriteTeams: copyOfArr});
        axios.patch(`/api/users/${currentUser.id}/remove_team`, {teamToRemove})
        .then(res => {
            alert(res.data.message);
        }).catch(err => console.log('Remove Axios Team Patch Error!!', err));
    }
    render() {
        const { currentPlayer, currentTeam, username, email, image, password, teams, players, sports, favoriteTeams, favoritePlayers, favoriteSport } = this.state;
        const { forEdit, currentUser } = this.props;
        if((currentUser && window.location.href === `${window.location.origin}/edit_profile`) || 
            window.location.href === `${window.location.origin}/register`) {
            return (
                <form className='form register' onSubmit={(e) => forEdit ? this.updateProfile(e) : this.register()}>
                    <div className='first-div register'>
                        <p className='label-input register'>Username</p>
                        <input type='text' className='input register' placeholder={forEdit ? currentUser.username : ''}
                        onChange={e => this.hanRegUsername(e.target.value)} value={username} min={6} max={40} required={!forEdit && true}/>
                        <p className='label-input register'>Email</p>
                        <input type='text' className='input register file' placeholder={forEdit ? currentUser.email : ''} autoComplete='email'
                        onChange={e => this.hanRegEmail(e.target.value)} value={email} min={6} max={40} required={!forEdit && true}/>
                    </div>
                    <div className='img-div register'>
                        <img className='img register'
                        src={image || 'https://via.placeholder.com/350x150'} alt={username}  required={!forEdit && true}/>   
                    </div>
                    <div className='second-div register'>        
                        <p className='label-input register'>Image</p>
                        <input type='file' className='input register' 
                        onChange={e => this.handleImageUpload(e.target.files)} required={!forEdit && true}/>                
                        <p className='label-input register'>Password</p>
                        {forEdit ? <button>Reset Password</button> 
                        : <input type='password' className='input register' 
                            onChange={e => this.hanRegPassword(e.target.value)} value={password} min={6} max={50} required={!forEdit && true}/>}     
                        <p className='label register select'>Age</p>
                        <input className='input register' type='date' max='2005-06-01' onChange={e => this.hanRegAge(e.target.value)}
                        placeholder={forEdit ? currentUser.age : ''}/>    
                        <p className='label register select'>Favorite Teams</p>
                        <div className='data-list-div'>
                            <input list='teams'  className='input register' onChange={e => this.handleCurrentTeam(e.target.value)} value={currentTeam}/>
                            <button onClick={e => forEdit ? this.addToFavTeams(e) : this.hanRegFavTeams(e)}><FaPlus /></button>
                        </div>
                        <datalist id='teams'
                        value={favoriteTeams[favoriteTeams.length - 1] && favoriteTeams[favoriteTeams.length - 1].name} required={!forEdit && true}>
                            {teams.map((t, i) => <option key={i}>{t.name}</option>)}
                        </datalist>
                        <p className='label register select'>Favorite Players</p>
                        <div className='data-list-div'>
                            <input list='players'  className='input register' onChange={e => this.handleCurrentPlayer(e.target.value)} value={currentPlayer}/>
                            <button onClick={(e) => forEdit ? this.addToFavPlayers(e) : this.hanRegFavPlayers(e)}><FaPlus /></button>
                        </div>
                        <datalist id='players' 
                        value={favoritePlayers[favoritePlayers.length - 1] && favoritePlayers[favoritePlayers.length - 1].name} required={!forEdit && true}>
                            {players.map((player, i) => <option key={i}>{player.name}</option>)}
                        </datalist>
                        <p className='label register select'>Favorite Sport</p>
                        <select className='select register'
                        onChange={e => this.hanRegFavSport(e.target.value)} value={favoriteSport} required={!forEdit && true}>
                            {sports.map((sport, i) => <option key={i}>{sport.name}</option>)}
                        </select>
                        <div className='register-form-favorite-teams-div'>
                            {favoriteTeams && favoriteTeams.map((team, i) => <div className='team-card-wrapper' key={i} 
                            onClick={() => forEdit ? this.removeTeams(team.name) : this.deleteTeam(team.name)}><TeamCard key={i} {...team} /></div>)}
                        </div>
                        <div className='register-form-favorite-players-div'>                    
                            {favoritePlayers && favoritePlayers.map((player, i) => <div className='player-card-wrapper' key={i} 
                            onClick={() => forEdit ? this.removePlayers(player.name) : this.deletePlayer(player.name)}><PlayerCard key={i} {...player} /></div>)}
                        </div>
                    </div>
                    <div className='btn-div register'>
                        <button type='submit' className='btn register'>{forEdit ? 'Edit Profile' : 'Register'}</button>
                    </div>
                </form>
            );
        } else {
            return <Popup />
        }
    }
}
Form.defaultProps = {
    forEdit: false,
    redirect: null
}
const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Form);
