import React, { Component } from 'react';
import Login from '../userSubComponents/Login/Login';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import uuid from 'uuid';
import { loginUser } from '../../redux/reducer';
import axios from 'axios';
import './LoginPage.css';

 class LoginPage extends Component {
    redirect  = (path) => {
        this.props.history.push(path);
    }
    render() {
        return (
            <div className='page-container-div login'>
                <div className='login-page-wrapper'>
                    <Login redirect={this.redirect} /><br/>
                    <div className='login-page-register-link' >
                        <button onClick={() => this.redirect(`/register/${uuid.v4()}`)}>Register Here</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
}

export default withRouter(connect(mapStateToProps)(LoginPage));