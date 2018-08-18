import React from 'react';
import MdCheck from 'react-icons/lib/md/check';
import './PostPopup.css';

const PostPopup = (props) => {
    const { title, description, image, date, tags, sport } = props;
    return (
            <div className='post-popup-container'>
                {/*Check */}
                <h1>Post Created</h1>
                <MdCheck className='post-popup-check' />
                <img src={image} alt={title} className="post-popup-image"/>
                <p>Title: {title}</p>
                <p>Description: {description}</p>
                <p>Date: {date}</p>
                <p>League: {sport}</p>
                <div>
                Tags: {tags && tags.length ? tags.map((tag, i) => <p key={i}>{tag}</p>) : null}
                </div>
            </div>
    );
}

export default PostPopup;