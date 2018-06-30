import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../postSubComponents/Post/Post';
import EditPost from '../postSubComponents/EditPost/EditPost';


class EditPostContainer extends Component {
    constructor() {
        super();
        this.state = {
            showEditPost: false
        }
    }

    render() {
        const { showEditPost } = this.state;
        const { post, currentUser } = this.props;
        return (
            <div className='dashboard-post-wrapper'>
                <Post {...post} reRender={this.props.reRender} isInDashboard={true} linkTo={this.props.linkFunc}
                user_image={currentUser.image} username={currentUser.username}/>
                <button className='dashboard btn' onClick={() => this.setState({showEditPost: !this.state.showEditPost})}>
                    Edit
                </button>
                <div className='dashboard-edit-post-wrapper' style={{display: showEditPost ? 'inline-block' : 'none'}}>
                    <EditPost reRender={this.props.reRender}  {...post} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps)(EditPostContainer);