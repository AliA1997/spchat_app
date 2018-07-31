import React, { Component } from 'react';
import UserCard from '../userSubComponents/UserCard/UserCard';
import Search from '../generalSubComponents/Search/Search';
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
        axios.get(`/api/search/users?user=`)
        .then(res => {
            console.log('Users search ---------', res.data.users);
            this.setState({users: res.data.users});
        }).catch(err => console.log('Axios get searchUsers--------', err));
    }
    linkFunc = (path) => {
        this.props.history.push(path);
    }
    handleChange = (val) => {
        axios.get(`/api/search/users?user=${val}`)
        .then(res => {
            console.log('Posts of search-------------', res.data.users);
            this.setState({users: res.data.users});                       
        }).catch(err => console.log('Axios get searchPosts--------', err));
    }
    render() {
        const { users } = this.state;
        return (
            <div className='user-page-container-div'>
                <Search handleChange={this.handleChange} />
                <h2 className='posts-page title'>Search Results</h2>
                {users && users.length ?  users.map((item, i) => <UserCard key={i} {...item} link={this.linkFunc}/>) :
                <div>
                    <p>No Results</p>
                </div>}
            </div>
        );
    }
}


export default withRouter(UsersPage);