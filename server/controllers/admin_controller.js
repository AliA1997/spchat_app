const nodemailerCtrl = require('./nodemailer_controller');
module.exports = {
    readAdminUsers(req, res) {
        const dbInstance = req.app.get('db');
        dbInstance.read_admin_users()
        .then(users => {
            res.status(200).json({users});
        }).catch(err => console.log('Database admin users error--------', err));
    },
    issueUserWarning(req, res) {
        const { warning, email } = req.body;
        console.log('email------', email);
        nodemailerCtrl.issueWarning(email, warning);
        res.status(200).json({message: 'Warrning sent successfully!'});
    },
    readAdminPosts(req, res) {
        const dbInstance = req.app.get('db');
        dbInstance.read_admin_posts()
        .then(posts => {
            res.status(200).json({posts});
        }).catch(err => console.log('Database admin posts error---------', err));
    },
    issuePostWarning(req, res) {
        res.status(200).json({message: 'Post Warning sent succesfully!'});
    },
    deleteAdminUser(req, res) {
        const dbInstance = req.app.get('db');
        const { user_id } = req.params;
        dbInstance.delete_admin_user(user_id)
        .then(user => {
            res.status(200).json({message: 'User Deleted Successfully!'});
        }).catch(err => console.log('Database delete admin user error--------', err));
    },
    deleteAdminPost(req, res) {
        const dbInstance = req.app.get('db');
        const { post_id } = req.params;
        dbInstance.delete_admin_post(post_id)
        .then(post => {
            res.status(200).json({message: 'Post Deleted Successfully!'});
        }).catch(err => console.log('Database delete post error------------', err));
    }
}