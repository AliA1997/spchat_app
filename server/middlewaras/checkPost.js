module.exports = function(req, res, next) {
    const { username } = req.session.user;
    if(req.session.user.username === username) next();
    else res.status(401).json({message: 'Unauthorized!'});
}