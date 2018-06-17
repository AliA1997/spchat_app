import React, { Component } from 'react';
import MdCheck from 'react-icons/lib/md/check';
import './SurveyAnswer.css';

export default class SurveyAnswer extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false
        }
    }
    render() {
        const { answer } = this.props;
        const { clicked } = this.state;
        return (
            <div className='answer-div' style={{background: clicked ? 'green' : 'transparent'}}>
                <div className='answer-circle-div' 
                onClick={() => this.setState({clicked: !this.state.clicked})}>
                    {clicked ? <MdCheck /> : null}
                </div>
                <div className='answer-text-div'>
                    {answer}
                </div>
            </div>
        );
    }
}