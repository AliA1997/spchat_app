import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from './redux/reducer';
import Nav from './components/generalSubComponents/Nav/Nav';
import Particles from 'react-particles-js';
import backgroundParams from './background-particles.json';
import axios from 'axios';
import routes from './routes';
import './App.css';

class App extends Component {
    componentDidMount() {
        const { dispatch, currentUser } = this.props;
        axios.get('/api/user-data').then(res => {
            dispatch(loginUser(res.data.user));
            console.log('Current User--------', currentUser);
        }).catch(err => console.log('User Data Error----------', err));
    }    
    render() {
    const { currentUser } = this.props;
    console.log('Current user----------', currentUser);
    return (
        <div>
          <Nav />
          {/* <Particles className='particles-background' params={backgroundParams} /> */}
          {routes}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state._persist.rehydrated && !state.loggedOut ? state.currentUser : state._persist.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(App));
