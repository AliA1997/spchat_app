import React, { Component } from 'react';
import UserCard from '../userSubComponents/UserCard/UserCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './UsersPage.css';

class UsersPage extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        axios.get(`/api/search/users`)
        .then(res => {
            console.log('Users search ---------', res.data.users);
            this.setState({users: res.data.users});
        }).catch(err => console.log('Axios get searchUsers--------', err));
    }
    linkFunc = (path) => {
        this.props.history.push(path);
    }
    render() {
        const { users } = this.state;
        return (
            <div className='user-page-container-div'>
                {users && users.map((item, i) => <UserCard key={i} {...item} link={this.linkFunc}/>)}
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