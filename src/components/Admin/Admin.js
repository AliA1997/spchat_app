import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import AdminPost from '../adminSubComponents/AdminPost/AdminPost';
import UserCard from '../userSubComponents/UserCard/UserCard';
import Loader from '../generalSubComponents/Loader/Loader';
import GoEye from 'react-icons/lib/go/eye';
import './Admin.css';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            posts: [],
            loading: true,
            hidden: true
        }
    }
    componentDidMount() {
        const { currentUser } = this.props;
        if(!currentUser.isadmin) {
            this.props.history.push('/');
        } else {
            const { loading } = this.state;
            if(!loading) this.setState({loading: true});
            const users = axios.get('/api/admin/users');
            const posts = axios.get('/api/admin/posts');
            Promise.all([users, posts])
            .then(res => {
                this.setState({users: res[0].data.users, posts: res[1].data.posts, loading: false});
            }).catch(err => console.log('Admin Axios Error---------', err));
        }
    }
    reRenderUsers = () => {
        axios.get('/api/admin/users')
        .then(res => {
            this.setState({users: res.data.users});
        }).catch(err => console.log('Axios Users Error---------', err));
    }
    reRenderPosts = () => {
        axios.get('/api/admin/posts')
        .then(res => {
            this.setState({posts: res.data.posts});
        }).catch(err => console.log('Axios Posts Error---------', err));
    }
    render() {
        const { users, posts, loading, hidden } = this.state;
        const { currentUser } = this.props;
        if(!currentUser.isadmin) this.props.history.push('/'); 
        if(!loading) {
            return (
                <div className='admin-container-div'>
                    <div className='admin-wrapper'>
                        <div className='admin-page-administrator-div'>
                            <div className='admin-page-img-div'>
                                <img src={currentUser.image} alt={currentUser.username} className='admin-page-img' />
                                <p className='admin-page-title'>Welcome Administator!</p>
                            </div>
                            <div className='admin-page-info-div'>
                                <p>Email: {hidden ? '***********' : currentUser.email}</p>
                                <button onClick={() => this.setState({hidden: !this.state.hidden})}>Show Email<GoEye /></button>
                            </div>
                        </div>
                        <div className='admin-page-user-title'>Users</div>
                        <div className='admin-users-div'>
                            {users && users.map((user, i) => <UserCard isAdmin={true} reRender={this.reRenderUsers} key={i} {...user} />)}
                        </div>
                        <div className='admin-page-post-title'> Posts </div>
                        <div className='admin-posts-div'>
                            {posts && posts.map((post, i) => <AdminPost reRender={this.reRenderPosts} key={i} {...post} />)}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(Admin));
