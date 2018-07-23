import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import './Post.css';

// function displayLongWord(str) {
//     if(str.length > 10) {
//         let strArr = str.split('').slice(0, 20);
//         return strArr.concat('....')
//         // .join('');
//     }
// }
const Post = props => {
        // const displayDescription = displayLongWord(props.description); 
        // console.log('isInDashboard State-------------', props.state.isInDashboard);
        // console.log('-----------location', window.location.href)
        // console.log('--------desired location', `http://lalhost:${window.location.port}/dashboard`);
        // console.log('props-sport-----------', props.sport);
        // console.log('props--------id------------', props.id);
        console.log('-----------prop', props);
        return (
            <div className='post-container-div'>
                <div className='post-main-div' onClick={() => props.linkTo(`/posts/${props.sport}/${props.id}`)}>
                    <div className='post-image'>
                        <img src={props.image} alt={props.title}/>
                    </div>
                    <div className='post-description-div'>
                        <div className='post-user-info-div'>
                            <div className='empty-div-1'></div>
                            <p className='post-username'>{props.username}</p>
                            <img className='post-username-image' 
                            src={props.user_image} alt={props.username} />
                        </div>
                        <div className='post-title-div'>
                            <p className='post-title'>Topic:</p>
                            <p>{props.title}</p>
                        </div>
                        <p className='post-date'>{props.date}</p>
                        <div className='post-tags-div'>
                            {props.tags && props.tags.map((tag, i) => <p key={i} className='post-tag'>{tag}</p>)}
                        </div>
                    </div>
                </div>
                <button className='edit-post delete-button' style={{display: props.isInDashboard ? 'inline-block' : 'none'}}
                    onClick={(e) => props.deletePost(e)}>Delete</button>
            </div>
        );
}
Post.defaultProps = {
    isInDashboard: false
}

export default Post;
