import React, { Component } from 'react';
import SurveyAnswer from './SurveyAnswer/SurveyAnswer';
import axios from 'axios';

export default class SurveyAnswerContainer extends Component {
    constructor() {
        super();
        this.state = {
            answered: false
        }
    }
    clickedAnswer = (answer) => {
        const { question } = this.props;
        console.log('question----------', question);
        const { answered } = this.state;
        if(!answered) {
            axios.patch('/api/answer/survey', {question, answer})
            .then(res => {
                console.log(res.data.message);
                alert(res.data.message);
                this.setState({answered: true});
            }).catch(err => console.log("Answer Error----------", err));
        } else {
            axios.patch('/api/unanswer/survey', {question, answer})
            .then(res => {
                console.log(res.data.message);
                alert(res.data.message);
                this.setState({answered: false});
            }).catch(err => console.log("Answer Error----------", err));
        }   
    }
    render() {
        return (
            <SurveyAnswer {...this.props} clicked={this.clickedAnswer} {...this.state}/>
        );
    }
}