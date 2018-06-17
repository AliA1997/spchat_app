import React, { Component } from 'react';
import axios from 'axios';
import FaSearch from 'react-icons/lib/fa/search';
import './Search.css';

export default class Search extends Component {

    render() {
        // const inSportsPage = window.location.href.includes('http://localhost:3000/sports/') ? true : false;
        const inAccountsPage = window.location.href === 'http://localhost:3000/dashboard/account' ? true : false;
        // console.log('true or false---------', inAccountsPage);
        return (
            <div className='search-div'>
                <div className='search-input'>
                    <input type='text' onChange={e => (this.props.search && this.props.search(e.target.value))}
                    placeholder='Search........'/>
                </div>
                <div className='search-icon' 
                onClick={() => this.props.linkFunc(inAccountsPage ? '/users' : '/posts')}>
                    <FaSearch />
                </div>
            </div>
        );
    }
}