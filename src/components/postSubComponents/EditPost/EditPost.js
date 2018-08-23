import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTime } from '../../../logic';
import './EditPost.css';
// import { editPost } from '../../../redux/reducer';


class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.description,
            title: props.title,
            imageurl: props.image,
            selectedTags: props.tags,
            message: '',
            sports: [
                'NBA', 
                'NFL',
                'NHl',
                'La Liga',
                'Premier League',
                'BundesLiga',
                'BMX',
                'Skateboarding',
                'Snowboarding',
                'Skiing',
                'Other'
            ],
            tags: [
                'LBJ',
                'GSW',
                'Golden State Warriors',
                'Los Angeles Lakers',
                'Los Angeles Clippers'
            ]
        }
    }

    handleEditPostImageUpload(files){

        //axios call to server to request hashed signature
        console.log('file', files)
        console.log('files', files[0])
        axios.get('/api/upload').then(response => {
            console.log(response.data)
        
        //form data for signed uploads

        let formData = new FormData();
        formData.append("signature", response.data.payload.signature)
        formData.append("api_key", "362976811768673");
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
    handleEditPostTitleChange(val) {
        this.setState({title: val});
    }
    handleEditPostDescriptionChange(val) {
        this.setState({description: val});
    }
    handleEditPostTagsChange(val) {
        this.setState({selectedTags: [...this.state.selectedTags, val]});
    }
    handleEditPostSportsChange(val) {
        this.setState({sport: val});
    }
    editPost(e) {
        e.preventDefault();
        let copyOfState = {...this.state};
        console.log('Copy of State--------', copyOfState)
        for(var key in copyOfState) {
            if(!copyOfState[key]) {
                //Set the property of the state to the props property if null.
                copyOfState[key] = this.props[key];
            } else if(!copyOfState[key].length) {
                //Set the selectedTags of the copied state to the props tags property.
                copyOfState[key] = this.props['tags'];
            }
        }
        const { title, description, selectedTags, sport, imageurl } = copyOfState;
        const date = getTime();
            axios.put( `/api/posts`, { title, description, date, selectedTags, sport, imageurl, id: this.props.id})
            .then(res => {
                this.props.reRender();
            }).catch(err => console.log('Axios editpost error-------- ', err));
    }
    render() {
        const { title, description, selectedTags, sport, sports, tags, imageurl } = this.state;        
        return (
            <form className='edit-post form'  onSubmit={e => this.editPost(e)}>
                <img src={imageurl}  className='edit-post-image' alt={title} />
                <p className='edit-form-image-label'>Image</p>
                <input type='file' className='input edit-post'
                onChange={e => this.handleEditPostImageUpload(e.target.files)} />
                <p className='edit-form-image-label'>Title</p>
                <input type='text' className='input edit-post'
                onChange={e => this.handleEditPostTitleChange(e.target.value)}
                placeholder={title} />
                <p className='edit-form-image-label'>Description</p>
                <textarea type='text' className='textarea edit-post'
                onChange={e => this.handleEditPostDescriptionChange(e.target.value)}
                placeholder={description}>
                </textarea>
                <p className='edit-form-image-label'>Sports</p>
                <select selected={sport} onChange={e => this.handleEditPostSportsChange(e.target.value)}>
                    {sports && sports.map((sport, i) => <option key={i}>{sport}</option>)}
                </select>
                <p className='edit-form-image-label'>Tags</p>
                <select selected='' onChange={e => this.handleEditPostTagsChange(e.target.value)}>
                    {tags && tags.map((tag, i) => <option key={i}>{tag}</option>)}
                </select>
                <div className='selected-tags-div'>
                    {selectedTags && selectedTags.map((sTag, i) => <div key={i} className='selected-tag-div'>{sTag}</div>)}
                </div><br />
                <div className='edit-post div'>
                    <button type='submit' className='edit-post btn'>Edit Post</button>
                </div><br/>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        doEditPost: state.post.doEditPost
    }
}
export default connect(mapStateToProps)(EditPost);