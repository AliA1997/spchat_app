import React, { Component } from 'react';
import UserCard from '../userSubComponents/UserCard/UserCard';
import { connect } from 'react-redux';
import './UsersPage.css';

class UsersPage extends Component {

    render() {
        const { searchItems } = this.props;
        return (
            <div>
                {searchItems && searchItems.map((item, i) => <UserCard key={i} {...item} />)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchItems: state.search.searchItems
    };
}

export default connect(mapStateToProps)(UsersPage);