module.exports = function(req, res, next) {
    const dbInstance = req.app.get('db');
    const { title } = req.body;
    console.log('title------------', title);
    dbInstance.check_add_trophy(title).then(users => {
        console.log(users[0]);
        if(users[0] && users[0].posts.length) {
            res.json({message: 'Already liked a trophy!'});
        } else {
            next();
        }
    }).catch(err => console.log('check trophy middleware database error----------', err));
    
}