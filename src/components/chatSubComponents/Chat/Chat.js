import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import FaCommentsO from 'react-icons/lib/fa/comments-o';
import FaCommentO from 'react-icons/lib/fa/comment-o';
import GoOrganization from 'react-icons/lib/go/organization';
import './Chat.css';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: [],
            message: '',
            typingMessage: '',
            typing: false
        }
        const { currentUser } = props;

        // let connectionObj = {
        //     room: props.topic,
        //     id: props.id
        // }
        this.socket = io('/', {query: `username=${currentUser ? currentUser.username : 'Anonymous'}&topic=${props.topic}&post_id=${props.postId}&imageurl=${currentUser ? currentUser.image :'https://www.androidpolice.com/wp-content/uploads/2013/04/nexusae0_googlenow_help_avatar_thumb.png'}`});
        this.socket.emit('room');
        console.log('--------room prop', props.topic);
        this.sendMessage = (val) => {
            console.log(val);
            const newMessage = {
                message: val
            }
            console.log('Message sent---------', val);
            this.socket.emit('SEND_MESSAGE', newMessage);
        }

        this.isTyping = (username) => {  
            this.socket.emit('TYPING', `${username} is typing.....`);
            this.setState({typing: true});
        }
        this.socket.on('SEND_USER', (data) => {
            this.setState({users: data});
        })
        this.socket.on('RECIEVE_MESSAGE', (data) => {
            console.log('data------------', data);
            console.log('received messages hit---------');
            // console.log('messages------------', this.state.messages);
            this.setState({messages: [...this.state.messages, data], typing: false, message: ''});
        })
        this.socket.on('USER_ON_TYPING', (data) => {
            // console.log('TYPING event emitter data--------', data)
            // this.socket.emit('TYPING', data);
            this.setState({typing: true, typingMessage: data});
            // console.log('TYPING event emitter hit----------', this.state.typing);
            // console.log('Typing message---------', this.state.typingMessage);
        })
    }
    handleChange(val) {
        const { currentUser } = this.props;
        const typingUsername = currentUser ? currentUser.username : 'Anonymous';
        this.isTyping(typingUsername);
        this.setState({message: val, typing: true});
    }
    render() {
        // const { currentUser } = this.props;
        const { users, messages, message, typing, typingMessage } = this.state;
        console.log('Typing---------------', typing);
        console.log('nessages----------', messages);
        console.log('Typing Message---------------', typingMessage);
        return (
            <div className='chat-container-div'>
                <div className='chat-div style'>>
                    <div className='title chat'>
                        {(this.props.namespace && this.props.topic) ? this.props.namespace : null}<FaCommentsO />
                    </div>
                    <div className='chat-users-messages'>
                        {messages && messages.map((mess, i) => 
                            <div className='chat message-div' key={i}>
                                <div className='chat message-div-user-info'>
                                    <img className='chat-message-img' src={mess.imageurl} alt={mess.username} />
                                    <p className='chat username'>{mess.username}</p>
                                </div>
                                <p className='chat message'>{mess.message}</p>
                            </div>)}
                        <div className='chat-broadcast-event'>
                            {typingMessage}
                        </div>
                    </div>
                    <div className='chat message-form'>
                        <p className='chat message-title'>Send Message</p>
                        <input type='text' onChange={e => this.handleChange(e.target.value)} 
                        value={message}/>
                        <button onClick={e => this.sendMessage(message)}>
                            Send Message<FaCommentO />
                        </button>
                    </div>
                    <div className='chat-users-list'>
                        <p className='chat-users-header'>Users<GoOrganization /></p>
                        {users && users.map((user, i) => <p className='chat user' key={i}>{user}</p>)}
                    </div>
                </div>
            </div>
        );
    }
}

Chat.defaultProps = {
    username: 'Ali'
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
    }
}

export default connect(mapStateToProps)(Chat);