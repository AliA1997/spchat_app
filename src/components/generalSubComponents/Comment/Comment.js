import React from 'react';
import IoCloseCircled from 'react-icons/lib/io/close-circled';
import GoPencil from 'react-icons/lib/go/pencil';
import './Comment.css';

// 
const Comment = props => {
    console.log('COmment text---------', props.text);
    console.log('Edit-------------------', props.doEditComment);
    console.log('Post-id----------', props.editText);
    return (
        <div className='comment-div'>
            <p className='comment-username'>{props.username}</p>
            <p className='comment-text'>{props.text}</p>                
            <div className='comment-button-div'>
                <button onClick={() => props.doEditComment ? props.edit(props.post_id, props.id) : props.showTextArea()}>Edit<GoPencil /></button>
                <button onClick={() => props.delete(props.post_id, props.id)}>Delete<IoCloseCircled /></button>
            </div>
            <textarea className='comment-text-area' value={props.editText}
            placeholder={props.text}
            style={{display: props.doEditComment ? 'inline-block' : 'none'}}
            onChange={e => props.handleChange(e.target.value)}>
            </textarea>
        </div>
    );
}

export default Comment;
