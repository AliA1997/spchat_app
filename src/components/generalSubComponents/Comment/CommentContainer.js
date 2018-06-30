import React, { Component } from 'react';
import Comment from './Comment';

export default class CommentContainer extends Component {
    constructor() {
        super();
        this.state = {
            doEdit: false 
        }
    }

    showTextArea = () => {
        this.setState({doEdit: !this.state.doEdit});
    }
    render() {
        const { comment } = this.props;
        const { doEdit } = this.state;
        return <Comment {...comment} doEditComment={doEdit} handleChange={this.props.handleChange} 
                showTextArea={this.showTextArea} editText={this.props.editText} delete={this.props.delete}
                edit={this.props.edit}/>
    }
}