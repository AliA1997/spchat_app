import React, { Component } from 'react';
import { loginUser } from '../../../redux/reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import sportsOptions from '../../../sports-data/sports-options.json';
import nbaPlayers from '../../../sports-data/nba-players.json';
import './Form.css';
import axios from 'axios';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            image: '',
            password: '',
            favoriteTeams: [],
            favoritePlayers: [],
            favoriteSport: '',
            age: '',
            ages: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            teams: ['Cleveland Cavaliers', 'Golden State Warriors'],
            players: nbaPlayers,   
            sports: sportsOptions                               
        }
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
        this.setState({age: val});
    }   
    hanRegFavTeams(val) {
        if(this.state.favoriteTeams.length) {
        const copyOfFavTeams = this.state.favoriteTeams.slice();
        this.setState({favoriteTeams: copyOfFavTeams.concat(val)});
        } else {
            this.setState({favoriteTeams: [...this.state.favoriteTeams, val]})
        }
    }    

    hanRegFavPlayers(val) {
        const copyOfFavPlayers = this.state.favoritePlayers.slice();
        this.setState({favoritePlayers: copyOfFavPlayers.concat(val)});
    }    

    hanRegFavSport(val) {
        this.setState({favoriteSport: val});
    }    
    register() {
        const { username, email, image, password, age, favoriteTeams, favoritePlayers, favoriteSport } = this.state;
        const { dispatch, currentUser } = this.props;
        axios.post('/api/register', { username, email, image, password, age, favoriteTeams, favoritePlayers, favoriteSport })
        .then(res => {
            if(res.data.user) {
                console.log(res.data.message);
                dispatch(loginUser(res.data.user));
            }
        }).catch(err => console.log('Axios Post Error-------------', err));
        this.props.redirect();
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
        formData.append("api_key", "362976811768673");
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
    render() {
        const { username, email, image, password, age, teams, players, sports, ages, favoriteTeams, favoritePlayers, favoriteSport } = this.state;
        return (
            <form className='form register'>
                <p className='label register'>Username</p>
                <input type='text' className='input register' 
                onChange={e => this.hanRegUsername(e.target.value)} value={username} />
                <p className='label register'>Email</p>
                <input type='text' className='input register' 
                onChange={e => this.hanRegEmail(e.target.value)} value={email} /><br/>
                <img className='img register'
                src={image || 'https://via.placeholder.com/350x150'} alt={username} /><br/>           
                <p className='label register'>Image</p>
                <input type='file' className='input register' 
                onChange={e => this.handleImageUpload(e.target.files)} />                
                <p className='label register'>Password</p>
                <input type='password' className='input register'
                onChange={e => this.hanRegPassword(e.target.value)} value={password} />     
                <p className='label register select'>Age</p>
                <select className='select register'
                onChange={e => this.hanRegAge(e.target.value)} value={age}>
                    {ages.map((a, i) => <option key={i}>{a}</option>)}
                </select>           
                <p className='label register select'>Favorite Teams</p>
                <select className='select register'
                onChange={e => this.hanRegFavTeams(e.target.value)} value={favoriteTeams[favoriteTeams.length - 1]}>
                    {teams.map((t, i) => <option key={i}>{t}</option>)}
                </select>
                <p className='label register select'>Favorite Players</p>
                <select className='select register'
                onChange={e => this.hanRegFavPlayers(e.target.value)} value={favoritePlayers[favoritePlayers.length - 1] && favoritePlayers[favoritePlayers.length - 1].name}>
                    {players.map((player, i) => <option key={i}>{player.name}</option>)}
                </select>
                <p className='label register select'>Favorite Sport</p>
                <select className='select register'
                onChange={e => this.hanRegFavSport(e.target.value)} value={favoriteSport}>
                    {sports.map((sport, i) => <option key={i}>{sport.name}</option>)}
                </select>
                <button onClick={() => this.register()} className='btn register'>Register</button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Form);
