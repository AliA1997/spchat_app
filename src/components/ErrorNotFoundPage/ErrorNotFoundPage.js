import React, { Component } from 'react';
import IoSocialFreebsdDevil from 'react-icons/lib/io/social-freebsd-devil';
import './ErrorNotFoundPage.css';
// import notFoundImage from '../../imgs/404-not-found-image.jpg';

export default class ErrorNotFoundPage extends Component {
    render() {
        return (
            <div className='error-not-found-container-div'>
                <div className='error-not-found-wrapper'>
                    <h1 className='error-not-found-subtext'>Page Not Found</h1>
                    <div className='error-not-found-page-div'>
                        <h1 className='error-not-found-text'>404</h1>
                        <IoSocialFreebsdDevil className='not-found-img' />
                    </div>
                </div>
            </div>
        );
    }
}