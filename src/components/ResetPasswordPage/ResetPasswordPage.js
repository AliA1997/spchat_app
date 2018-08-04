import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class ResetPasswordPage extends Component {
    constructor() {
        super();
        this.state = {
            newPassword: '',
            newPassword2: '',
            username: '',
            passwordsMatch: false
        }
    }
    componentDidMount() {
        const { currentUser } = this.props;
        if(!currentUser) this.props.history.push('/login');
    }
    handleUsername(val) {
        this.setState({username: val});
    }
    handleNewPassword(val) {
        this.setState({newPassword: val})
    }
    handleNewPassword2(val) {
        if(val === this.state.newPassword && this.state.newPassword) this.setState({newPassword2: val, passwordsMatch: true})
    }
    updatePassword() {
        const { username, newPassword, newPassword2, passwordsMatch } = this.state;
        if(passwordsMatch && username) {
            axios.patch('/api/update_password', {username, password: newPassword, newPassword: newPassword2})
            .then(res => {
                alert(res.data.message);
                this.props.history.push('/dashboard');
            }).catch(err => console.log('Update Axios Password Error-------', err));
        }
    }
    render() {
        const { username, newPassword, newPassword2 } = this.state;
        return (
            <div>
                <input type="text" onChange={e => this.handleUsername(e.target.value)} value={username} />
                <input type="text" onChange={e => this.handleNewPassword(e.target.value)} value={newPassword} />
                <input type="text" onChange={e => this.handleNewPassword2(e.target.value)} value={newPassword2} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(ResetPasswordPage));