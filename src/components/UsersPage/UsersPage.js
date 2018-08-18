import React, { Component } from 'react';
import Loader from '../generalSubComponents/Loader/Loader';
import UserCard from '../userSubComponents/UserCard/UserCard';
import Search from '../generalSubComponents/Search/Search';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './UsersPage.css';

class UsersPage extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true
        }
    }
    componentDidMount() {
        axios.get(`/api/search/users?user=`)
        .then(res => {
            console.log('Users search ---------', res.data.users);
            this.setState({users: res.data.users, loading: false});
        }).catch(err => console.log('Axios get searchUsers--------', err));
    }
    linkFunc = (path) => {
        this.props.history.push(path);
    }
    handleChange = (val) => {
        this.setState({loading: true});
        axios.get(`/api/search/users?user=${val}`)
        .then(res => {
            console.log('Posts of search-------------', res.data.users);
            this.setState({users: res.data.users, loading: false});                       
        }).catch(err => console.log('Axios get searchPosts--------', err));
    }
    render() {
        const { users, loading } = this.state;
        return (
            <div className='user-page-container-div'>
                <Search handleChange={this.handleChange} />
                <h2 className='posts-page title'>Search Results</h2>
                <div>
                {!loading ? users && users.length ?  users.map((item, i) => i < 10 && <UserCard key={item.id} {...item} link={this.linkFunc}/>) :
                    <p>No Results</p>
                 : <Loader />}
                </div>
            </div>
        );
    }
}


export default withRouter(UsersPage);