import React, { Component } from 'react';
import Chat from '../chatSubComponents/Chat/Chat';
import { connect } from 'react-redux';

class ChatPage extends Component {
    render() {
        const { currentUser } = this.props;
        return (
            <div className='chatpage container-div'>
                <h1 className='title chatpage'>Chat {this.props.match.params.sportId}</h1>
                <Chat namespace={this.props.match.params.sportId} topic={[{title: 'default'}]}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
    }
}

export default connect(mapStateToProps)(ChatPage);