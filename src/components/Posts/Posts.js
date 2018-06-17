import React, {Component} from 'react';
import Post from '../postSubComponents/Post/Post';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { getSearch, doneSearch } from '../../redux/reducer';
// import axios from 'axios';

class Posts extends Component {

    // componentDidMount() {
    //     if(!this.props.sportsPosts || !this.props.doSearch) {
    //         axios.get('/api/posts').then(res => {
    //             this.setState({posts: res.data.posts, loading: false});
    //         }).catch(err => console.log('Axios Get Error----------', err));
    //     } 
    // }

    render() {
        const  { posts } = this.props;
        console.log('--------searchItems-----', this.props.searchItems);
        return (
            <div>
                {(!this.props.sportsPosts && !this.props.searchItems)
                ?   (posts && posts.map((post, i) => <Post key={i} {...post} />))
                : (!this.props.searchItems || !this.props.searchItems.length)
                ?  (this.props.sportsPosts && this.props.sportsPosts.map((post, i) => <Post key={i} {...post} />))
                :  (this.props.searchItems && this.props.searchItems.map((post, i) => <Post key={i} {...post} />))
                }
            </div>
        ); 
    }
}
Posts.defaultProps = {
    sportsPosts: null,
    // searchPosts: null
}

// const mapStateToProps = state => {
//     return {
//         doSearch: state.doSearch,
//         searchItems: state.searchItems
//     }
// }

export default withRouter(connect()(Posts));