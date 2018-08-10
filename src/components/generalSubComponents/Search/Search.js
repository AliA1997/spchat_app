import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import './Search.css';

const Search = props => {
    const { searchString } = props;
    console.log('props----------', props);
    // const inSportsPage = window.location.href.includes('http://localhost:3000/sports/') ? true : false;
    // const inAccountsPage = window.location.href.includes('http://localhost:3000/dashboard')
    // ||  window.location.href === `http://localhost:3000/users` ? true : false;
    // console.log('true or false---------', inAccountsPage);
    console.log(window.location.origin);
    return (
        <div className='search-div'>
            <div className='search-input'>
                <input type='text' onChange={e => (props.search && props.search(e.target.value))} 
                 value={searchString}
                 onChange={(e) => props.handleChange(e.target.value)}
                placeholder={window.location.href === `${window.location.origin}/dashboard`
                ||  window.location.href === `${window.location.origin}/users`  ? 'Search Users' : 'Search Posts'}/>
            </div>
            <div className='search-icon'>
                <FaSearch className='icon-search'/>
            </div>
        </div>
    );
}


export default Search;