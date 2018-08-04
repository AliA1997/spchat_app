import React from 'react';
import MdCheck from 'react-icons/lib/md/check';
import './PostPopup.css';

const PostPopup = (props) => {
    const { title, description, image, date, tags, sport } = props;
    return (
            <div>
                {/*Check */}
                <MdCheck className='post-popup-check' />
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