import React, { Component } from 'react';
import { loginUser, logoutUser } from '../../../redux/reducer';
import GoSignIn from 'react-icons/lib/go/sign-in';
import axios from 'axios';
import { connect } from 'react-redux';
import './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLoginUsername(val) {
        this.setState({username: val});
    }

    handleLoginPassword(val) {
        this.setState({password: val});
    }

    login(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const { dispatch, currentUser } = this.props;
        // this.setState({username: '', password: ''});
        axios.post('/api/login', { username, password }).then(res => {
            console.log(res);
            console.log(res.data.user);
            if(res.data.user) {
                dispatch(loginUser(res.data.user));
                console.log('login successful');
                //Refreshes the component, but does not do a hard-refresh or re-initializes redux state.
                this.setState(this.state);
                this.props.redirect('/');
            }
            else if(!res.data.user) console.log(res.data.message);
        }).catch(err => console.log('Axios login error---------', err));
    }

    render() {
        console.log(this.props);
        const { username, password } = this.state;
        return (
            <form className='form login'>
                <div className='login-div'>
                    <h1 className='title login'>Login</h1>
                    <p className='login-label'>Username</p>
                    <input type='text' 
                    onChange={e => this.handleLoginUsername(e.target.value)} value={username} />
                    <p className='login-label'>Password</p>                 
                    <input type='password' 
                    onChange={e => this.handleLoginPassword(e.target.value)} value={password} />
                    <button className='btn login' onClick={(e) => this.login(e)}>Login<GoSignIn /></button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Login);