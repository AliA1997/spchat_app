import React, { Component } from 'react';
import MdCheck from 'react-icons/lib/md/check';
import './SurveyAnswer.css';

const SurveyAnswer = (props) => {
        const { answer, answered } = props;
        return (
            <div className='answer-div' style={{background: answered ? 'green' : 'transparent'}}>
                <div className='answer-circle-div' 
                onClick={() => props.clicked(answer)}>
                    {answered ? <MdCheck /> : null}
                </div>
                <div className='answer-text-div'>
                    {answer}
                </div>
            </div>
        );
}

export default SurveyAnswer;