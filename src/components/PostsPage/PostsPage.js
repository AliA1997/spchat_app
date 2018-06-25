import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../postSubComponents/Post/Post';
import './PostsPage.css';

class PostsPage extends Component {
    render() {
        const { searchItems } = this.props;
        return (
            <div className='posts-page-container-div'>
                <h1 className='posts-page title'>Search Results</h1>
                {(searchItems && searchItems.length) ? searchItems.map((item, i) => <Post key={i} {...item} />) 
                : <div className='posts-page-no-results-container-div'>
                    <p className='posts-page-no-results-text'>No Results</p>
                  </div> }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchItems: state.search.searchItems
    }
}

export default connect(mapStateToProps)(PostsPage);

