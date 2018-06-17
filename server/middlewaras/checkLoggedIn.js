module.exports = function(req, res, next) {
    if(req.session.user) {
        next();
    }
    res.status(400).json({message: 'Not Authorized'});
}
