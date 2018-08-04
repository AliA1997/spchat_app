module.exports = function(req, res, next) {
    const dbInstance = req.app.get('db');
    if(req.session.user) {
        const { id } = req.session.user;
        const { question } = req.body;
        dbInstance.read_questions(id).then(users => {
            if(users[0].questions.length) {
                console.log('Check Question Hit------------');
                const keys = users[0].questions.map(question => {
                    return Object.keys(question)[0];
                })
                console.log('Questions---------', keys);
                !keys.includes(question) ? next() : res.status(404).json({message: 'Question already answered!'})
            } else {
                next();
            }
        }).catch(err => console.log('Get Question Database Error----------', err));
    }
}