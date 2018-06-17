import React, { Component } from 'react';
import axios from 'axios';

export default class VerificationPage extends Component {
    constructor() {
        super();
        this.state = {
            verificationMessage: ''
        }
    }
    componentDidMount() {
        const key = window.location.href.split('=').pop();

        axios.put('/email_verification', {verification_link: key}).then(res => {
            this.setState({
                verificationMessage: 'Thank you, your email has been verified, you can now do whatever you want!' 
            })
            setTimeout(() => {
                window.location.href = '/';
            }, 2000)
        })
    }
    render() {
        return (
            <div className='email-verification-container'>
                <div>
                    <h1>{this.state.verificationMessage}</h1>
                </div>
            </div>
        );
    }
}