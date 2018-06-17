module.exports = {
    readSurvey: (req, res) => {
        const { id } = req.params;
        const dbInstance = req.app.get('db');
        dbInstance.read_survey(id)
        .then(survey => {
            res.status(200).json({survey});
        }).catch(err => console.log('Database read survey Error---------', err));
    }
}