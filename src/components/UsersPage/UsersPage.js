import React, { Component } from 'react';
import UserCard from '../userSubComponents/UserCard/UserCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './UsersPage.css';

class UsersPage extends Component {
    linkFunc = (path) => {
        this.props.history.push(path);
    }
    render() {
        const { searchItems } = this.props;
        return (
            <div className='user-page-container-div'>
                {searchItems && searchItems.map((item, i) => <UserCard key={i} {...item} link={this.linkFunc}/>)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchItems: state.search.searchItems
    };
}

export default withRouter(connect(mapStateToProps)(UsersPage));