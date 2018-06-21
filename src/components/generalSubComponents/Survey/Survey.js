import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import SurveyAnswer from './SurveyAnswer/SurveyAnswer';
import './Survey.css';

export default class Survey extends Component {
    constructor() {
        super();
        this.state = {
            survey: null,
            // loading: true
        }
    }
    componentDidMount() {
        // axios.get('/api/survey')
        // .then(res => {
        //     console.log(res.data.survey);
        //     this.setState({survey: res.data.survey, loading: false});
        // }).catch(err => console.log('Get Survey Axios Error!!'));
    }
    render() {
        // const { loading } = this.state;
        const { survey } = this.props;
        console.log('Survey--------', survey);
        // if(!loading) {
            return (
                <div className='survey-div'>
                    <p className='question-text'>
                    {survey[0].question && survey[0].question}
                    </p>
                    {survey[0].answers && survey[0].answers.map((answer, i) => <SurveyAnswer key={i} answer={answer} />)}
                </div>
            );
        // } else {
        //     return (
        //         <div className='loading-background'>
        //             <ReactLoading className='loading-component' color='#fff' 
        //                 type='bars' height={100} width={100}/>
        //         </div>
        //     );
        // }
    }
}