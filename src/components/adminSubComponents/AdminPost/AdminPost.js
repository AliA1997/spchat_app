import React, { Component } from 'react';
import Tag from '../../generalSubComponents/Tag/Tag';
import GoX from 'react-icons/lib/go/x';
import axios from 'axios';
import './AdminPost.css';

export default class AdminPost extends Component {
    constructor() {
        super();
        this.state = {
            reason: '',
            reasons: [
                '',
                'Inappropiate Content',
                'User not Verified',
                'Post not relate to any topic or sport'
            ]
        }
    }
    handleAdminPostSelect(val) {
        this.setState({reason: val});
    }
    deletePost() {
        const { id } = this.props;
        const { reason } = this.state;
        axios.delete(`/api/admin/posts/${id}`, {
            data: { reason }
        })
        .then(res => {
            alert(res.data.message);
            this.setState({reason: ''});
            this.props.reRender();
        }).catch(err => console.log('Axios Admin Delete Error-------', err));
    }
    render() {
        const { id, title, image, description, sport, username, tags } = this.props;
        const { reason, reasons } = this.state;
        console.log('---------tags', tags);
        return (
            <div className='admin-post-container-div'>
                <div className='admin-post-img-div'>
                    <img className='admin-post-img' src={image} alt={title} />
                </div>
                <div className='admin-post-wrapper'>
                    <p className='admin-post-title'>Title: {title}</p>
                    <p className='admin-post-description'>Description: {description}</p>
                    <p className='admin-post-description'>Sport: {sport}</p>
                    <div className='tags'>
                        {tags.map((tag, i) => <Tag key={i} name={tag}/>)}
                    </div>
                </div>
                <div className='admin-post-btn-div'>
                    <div className='admin-post-button-div'>
                        <select onChange={e => this.handleAdminPostSelect(e.target.value)}>
                            {reasons.map((reasonItem, i) => <option key={i} value={reasonItem}>{reasonItem}</option>)}
                        </select>
                        <button className='admin-post-delete-button' onClick={() => this.deletePost()} disabled={!reason && true}>
                            Delete Post<GoX className='admin-post-delete-icon' />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}