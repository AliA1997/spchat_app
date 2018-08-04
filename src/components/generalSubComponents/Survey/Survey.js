import React from 'react';
import SurveyAnswerContainer from './SurveyAnswerContainer/SurveyAnswerContainer';
import './Survey.css';

const Survey = (props) => {
    const { survey } = props;
    console.log('Survey--------', survey);
    return (
        <div className='survey-div'>
            <p className='question-text'>
            {survey[0].question && survey[0].question}
            </p>
            {survey[0].answers && survey[0].answers.map((answer, i) => <SurveyAnswerContainer {...survey[0]} key={i} answer={answer} />)}
        </div>
    );
}

export default Survey;