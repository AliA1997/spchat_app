module.exports = {
    readSurvey: (req, res) => {
        const { sport_id } = req.params;
        const dbInstance = req.app.get('db');
        dbInstance.read_survey(sport_id)
        .then(survey => {
            // console.log('survey-----------', survey);
            res.status(200).json({survey});
        }).catch(err => console.log('Database read survey Error---------', err));
    },
    readHomeSurvey: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.read_home_survey()
        .then(survey => {
            res.status(200).json({survey});
        }).catch(err => console.log('Database read home survey error----------', err));
    },
    answerQuestion: (req, res) => {
        const dbInstance = req.app.get('db');
        let newQuestion = {};
        const { question, answer } = req.body;
        newQuestion[question] = answer;
        const { id } = req.session.user;
        dbInstance.answer_question({id, question: newQuestion}).then(users => {
            res.json({message: 'Question Answered!!'});
        }).catch(err => console.log('Answer question Database Error--------', err));
    },
    unanswerQuestion: (req, res) => {
        const dbInstance = req.app.get('db');
        let newQuestion = {};
        const { question, answer } = req.body;
        newQuestion[question] = answer;
        const { id } = req.session.user;
        dbInstance.unanswered_question({id, question: newQuestion}).then(users => {
            res.json({message: 'Question Unanswered!!'});
        }).catch(err => console.log('Unanswered question Database Error--------', err));
    }
}