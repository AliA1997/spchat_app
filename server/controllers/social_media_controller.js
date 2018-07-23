function whatSocialMedia(option) {
    for(let key in option) {
        if(!option[key]) delete option[key];
    }
    return option;
}
module.exports = {
    createTwitter(req, res) {
        const { twitter } = req.body;
        const { id } = req.session.user;
        const dbInstance = req.app.get('db');
        dbInstance.create_twitter([twitter, id])
        .then(social_media => {
            res.status(200).json({message: 'Twitter Link Created Successfully!'});
        }).catch(err => console.log('Database Social Media Error Error---------', err));
    },
    createFacebook(req, res) {
        const { facebook } = req.body;
        const { id } = req.session.user;
        const dbInstance = req.app.get('db');
        dbInstance.create_facebook([facebook, id])
        .then(social_media => {
            res.status(200).json({message: 'Facebook Link Created Successfully!'});
        }).catch(err => console.log('Database Social Media Error Error---------', err));
    },
    createInstagram(req, res) {
        const { instagram } = req.body;
        const { id } = req.session.user;
        const dbInstance = req.app.get('db');
        dbInstance.create_instagram([instagram, id])
        .then(social_media => {
            res.status(200).json({message: 'Instagram Link Created Successfully!'});
        }).catch(err => console.log('Database Social Media Error Error---------', err));
    },
    createSnapchat(req, res) {
        const { snapchat } = req.body;
        const { id } = req.session.user;
        const dbInstance = req.app.get('db');
        dbInstance.create_snapchat([snapchat, id])
        .then(social_media => {
            res.status(200).json({message: 'Snapchat Link Created Successfully!'});
        }).catch(err => console.log('Database Social Media Error Error---------', err));
    },
    createTwitchTv(req, res) {
        const { twitchtv } = req.body;
        const { id } = req.session.user;
        const dbInstance = req.app.get('db');
        dbInstance.create_twitchtv([twitchtv, id])
        .then(social_media => {
            res.status(200).json({message: 'TwitchTv Link Created Successfully!'});
        }).catch(err => console.log('Database Social Media Error Error---------', err));
    },
    createReddit(req, res) {
        const { reddit } = req.body;
        console.log('req.body------------', req.body);
        const { id } = req.session.user;
        const dbInstance = req.app.get('db');
        dbInstance.create_reddit([reddit, id])
        .then(social_media => {
            res.status(200).json({message: 'Reddit Link Created Successfully!'});
        }).catch(err => console.log('Database Social Media Error Error---------', err));
    },
    createPlaystation(req, res) {
        const { playstation } = req.body;
        const { id } = req.session.user;
        const dbInstance = req.app.get('db');
        dbInstance.create_playstation([playstation, id])
        .then(social_media => {
            res.status(200).json({message: 'playstation Link Created Successfully!'});
        }).catch(err => console.log('Database Social Media Error Error---------', err));
    },
    createXbox(req, res) {
        const { xbox } = req.body;
        const { id } = req.session.user;
        const dbInstance = req.app.get('db');
        dbInstance.create_xbox([xbox, id])
        .then(social_media => {
            res.status(200).json({message: 'Xbox Link Created Successfully!'});
        }).catch(err => console.log('Database Social Media Error Error---------', err));
    }
}