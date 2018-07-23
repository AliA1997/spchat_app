import React, { Component } from 'react';

import { doneSearch } from '../../../redux/reducers/searchReducer';
import { connect } from 'react-redux';
import FaSearch from 'react-icons/lib/fa/search';
import './Search.css';

class Search extends Component {

    render() {

        // const inSportsPage = window.location.href.includes('http://localhost:3000/sports/') ? true : false;
        // const inAccountsPage = window.location.href.includes('http://localhost:3000/dashboard')
        // ||  window.location.href === `http://localhost:3000/users` ? true : false;
        const { dispatch, searchString } = this.props;
        // console.log('true or false---------', inAccountsPage);
        console.log(window.location.origin);
        return (
            <div className='search-div'>
                <div className='search-input'>
                    <input type='text' onChange={e => (this.props.search && this.props.search(e.target.value))}
                    onFocus={() => dispatch(doneSearch())} value={searchString}
                    placeholder={window.location.href === `${window.location.origin}/dashboard`
                    ||  window.location.href === `${window.location.origin}/users`  ? 'Clicked Button Search Users' : 'Clicked Button Search Posts'}/>
                </div>
                <div className='search-icon' 
                onClick={() => this.props.linkFunc(window.location.href === `${window.location.origin}/dashboard`
                ||  window.location.href === `${window.location.origin}/users` ? '/users' : '/posts')}>
                    <FaSearch className='icon-search'/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchString: state.search.searchString
    }
}

export default connect(mapStateToProps)(Search);