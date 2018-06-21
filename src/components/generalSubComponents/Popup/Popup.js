import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Login from '../../userSubComponents/Login/Login';
import { Link } from 'react-router-dom';
import './Popup.css';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : 'black'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
 
export default class Popup extends Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: true
    };
 
    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }
 
  openModal = () => {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
 
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
 
  render() {
    return (
      <div className='popup-container-div'>
        <button className='popup-open-modal' onClick={this.openModal}>Login</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className='popup-header'>Need to Login</div>
          <div className='login-popup-container-div'>
           <Login />
            <div className='register-popup-link-div'>
              <Link to='/register'>Register</Link>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}