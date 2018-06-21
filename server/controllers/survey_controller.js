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
    }
}