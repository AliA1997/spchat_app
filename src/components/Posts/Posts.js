import React, {Component} from 'react';
import Post from '../postSubComponents/Post/Post';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
// import { getSearch, doneSearch } from '../../redux/reducer';
// import axios from 'axios';

class Posts extends Component {
    constructor() {
        super();
        this.linkTo = this.linkTo.bind(this);
    }
    // componentDidMount() {
    //     console.log('isInDashboard state-----------------', this.state.isInDashboard);
    //     // this.setState({isInDashboard: window.location.href === `${window.location.origin}/dashboard` ? true : false})               
    // }
    deletePost = (e) => {
        e.preventDefault();
        const { user_id, id } = this.props; 
        // console.log('user_id------------', user_id);
        // console.log('post_id------------', id);
        if(window.confirm('You are sure you want to delete this post?')) {
            axios.delete(`/api/posts`, {
                data: {id, user_id}
            })
            .then(res => {
                // this.props.reRender();
                console.log(res.data.message);
            }).catch(err => console.log('Axios Delete Error----------', err));
        } else {

        }
    }
    linkTo(path) {
        this.props.history.push(path);
    }
    render() {
        const  { posts } = this.props;
        console.log('--------searchItems-----', this.props.searchItems);
        console.log('this.linkTo------------', this.linkTo);
        return (
            <div className='posts-div'>
                {(!this.props.sportsPosts && !this.props.searchItems)
                ?   (posts && posts.map((post, i) => <Post key={i} {...post} linkTo={this.linkTo} deletePost={this.deletePost} isInDashboard={this.props.isInDashboard} />))
                : (!this.props.searchItems || !this.props.searchItems.length)
                ?  (this.props.sportsPosts && this.props.sportsPosts.map((post, i) => <Post key={i} {...post} linkTo={this.linkTo}/>))
                :  (this.props.searchItems && this.props.searchItems.map((post, i) => <Post key={i} {...post} />))
                }
            </div>
        ); 
    }
}
Posts.defaultProps = {
    sportsPosts: null,
    isInDashboard: false,
    isInSportsPage: false
    // searchPosts: null
}

// const mapStateToProps = state => {
//     return {
//         doSearch: state.doSearch,
//         searchItems: state.searchItems
//     }
// }

export default withRouter(connect()(Posts));