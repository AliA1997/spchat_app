import React, { Component } from 'react';
import Form from '../generalSubComponents/Form/Form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './RegisterPage.css';

class RegisterPage extends Component {
    redirect = () => {
        this.props.history.push(`/`);
    }
    render() {
        return (
            <div className='container-div register'>
                <h1 className='title register'>Register</h1>
                <Form redirect={this.redirect}/>
            </div>
        );
    }
}

//Username and Password for Guest Accoutn
//Username <--- Anonymous 
//Password <--- 1234abcd
export default withRouter(connect()(RegisterPage));