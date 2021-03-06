import React, { Component } from 'react';
import Tag from '../../generalSubComponents/Tag/Tag';
import { getTime } from '../../../logic';
import { postCreated } from '../../../redux/reducers/postReducer';
import { connect } from 'react-redux';
import axios from 'axios';
import FaPlus from 'react-icons/lib/fa/plus';
// import MdControlPoint from 'react-icons/lib/md/control-point';
import sportsOptions from '../../../sports-data/sports-options.json';
import './PostForm.css';

class PostForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '', 
            imageurl: '',
            description: '',
            sport: '',
            currentTag: '',
            selectedTags: [],            
            sports: sportsOptions,
        }
    }
    componentDidMount() {
        if(!this.props.currentUser) {
            alert('Must Login Or Register');
            this.props.redirect('login');
        }
    }
    deleteTag = (tag) => {
        const copyOfSelectedTags = this.state.selectedTags.slice();
        // console.log('selectedTags----------------', copyOfSelectedTags);
        // console.log('tags------------', tag);
        let tagIndex = copyOfSelectedTags.indexOf(tag, val => val === tag);
        // console.log('tagIndex---------', tagIndex);
        copyOfSelectedTags.splice(tagIndex, 1);
        // console.log('After delete-----------', copyOfSelectedTags)
        this.setState({selectedTags: copyOfSelectedTags, currentTag: ''});
    }
    handleCurrentTag(val) {
        this.setState({currentTag: val});
    }
    handleCrtePostTitleChange(val) {
        this.setState({title: val});
    }
    handleCrtePostDescriptionChange(val) {
        this.setState({description: val});
    }
    handleCrtePostTagsChange(e) {
        e.preventDefault();
        const { selectedTags, currentTag } = this.state;
        const copyOfArr = selectedTags.slice();
        copyOfArr.push(currentTag);
        this.setState({selectedTags: copyOfArr});
        // console.log('Array==============', selectedTags)
    }
    handleCrtePostSportsChange(val) {
        this.setState({sport: val});
    }
    handleCrtePostImageUpload(files){

        //axios call to server to request hashed signature
        console.log('file', files)
        console.log('files', files[0])
        axios.get('/api/upload').then(response => {
            console.log(response.data)
        
        //form data for signed uploads

        let formData = new FormData();
        formData.append("signature", response.data.payload.signature)
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
        formData.append("timestamp", response.data.payload.timestamp)
        formData.append("file", files[0]);

        for(var pair of formData.entries()) {
            console.log(pair); 
         }

        //axios call to cloudinary using the URL set at top 
            axios.post('https://api.cloudinary.com/v1_1/alia1997/image/upload', formData).then(response => {
                console.log(response.data);

                // Setting state with the secure_url
                this.setState({
                    imageurl: response.data.secure_url
                })
            }).catch( err => {
                console.log(err);
            }) 
        })
    }
    createPost(e=null) {
        e.preventDefault();
        console.log(this.props.currentUser);
        if(this.props.currentUser) {
            const { title, imageurl, sport, description, selectedTags } = this.state;
            const { dispatch } = this.props;
            const date = getTime();
            axios.post('/api/posts', { title, imageurl, date, description, sport, selectedTags })
            .then(res => {
                dispatch(postCreated(res.data.post));
                console.log(res.data.message);
                this.props.redirect('dashboard');
            }).catch((err) => console.log('Axios create post error---------', err));
        } else {
            this.props.redirect('login');
        }
    }
    render() {
        const { currentTag, description, imageurl, title, sports, selectedTags } = this.state;
        console.log('SelectedTags----------', selectedTags);
        const { currentUser, sports_data } = this.props;
        console.log(currentUser);
        return (
            <form className='create-post form'  onSubmit={e => this.createPost(e)}>
                <div className='create-post-image-div'>
                    <img src={imageurl || 'https://via.placeholder.com/350x150'}  className='create-post-image' alt={title} />
                </div>
                <p className='create-form-image-label'>Image</p>
                <input type='file' className='input create-post file'
                onChange={e => this.handleCrtePostImageUpload(e.target.files)} required/>
                <p className='create-form-image-label'>Title</p>
                <input type='text' className='input create-post' value={title}
                onChange={e => this.handleCrtePostTitleChange(e.target.value)} min={8} max={40} required/>
                <p className='create-form-image-label'>Description</p>
                <textarea type='text' className='create-post-textarea' value={description}
                onChange={e => this.handleCrtePostDescriptionChange(e.target.value)} min={15} max={200} required>
                </textarea>
                <p className='create-form-image-label'>Sports</p>
                <select onChange={e => this.handleCrtePostSportsChange(e.target.value)} required>
                    {sports && sports.map((sport, i) => <option key={i}>{sport.name}</option>)}
                </select>
                <p className='create-form-image-label'>Tags</p>
                <div className='post-form-select-div'>
                    <input list='tags' onChange={e => this.handleCurrentTag(e.target.value)} value={currentTag} />
                    <button onClick={e => this.handleCrtePostTagsChange(e)}><FaPlus /></button>
                </div>
                <datalist id='tags'>
                    {sports_data && sports_data.map((tag, i) => <option className='post-form-tag-option' value={tag.name} key={i}>{tag.name}</option>)}
                </datalist>
                <div className='selected-tags-div'>
                    {selectedTags && selectedTags.map((sTag, i) => <Tag key={i} name={sTag} deleteTag={this.deleteTag}/>)}
                </div>
                <button type='submit' className='create-form-button'>Create Post</button>
            </form>
        );
    }
}


const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        doEditPost: state.post.doEditPost,
        sports_data: state.post.sports_data
    }
}

export default connect(mapStateToProps)(PostForm);