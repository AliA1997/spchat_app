import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from './redux/reducers/userReducer';
import Nav from './components/generalSubComponents/Nav/Nav';
import Particles from 'react-particles-js';
import subBackgroundParams from './sub-background-particles.json';
import axios from 'axios';
import routes from './routes';
import './App.css';
// import { loginUser } from './redux/reducer';

class App extends Component {
    componentDidMount() {
      const { dispatch } = this.props;
      axios.get('/api/user-data')
      .then(res => {
        if(!res.data.user) dispatch(logoutUser());
        console.log('res.data.user-----------', res.data.user);
        dispatch(loginUser(res.data.user));
      }).catch(err => console.log('Get User Data Axios Error----------', err));

    }    
    render() {
    const { currentUser } = this.props;
    console.log('Current user----------', currentUser);
    return (            
      <div>
      <Particles 
      params={subBackgroundParams} 
      className='background' />
        <div className='app'>
            <Nav />
            {routes}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state._persist.rehydrated && !state.loggedOut ? state.user.currentUser : state._persist.user.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(App));
