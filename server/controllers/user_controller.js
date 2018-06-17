const bcrypt = require('bcrypt');
const uuid = require('uuid');
const nodemailerCtrl = require('./nodemailer_controller');
const saltRounds = 12;
module.exports = {
    readUsers: (req, res) => {

    },
    readUser: (req, res) => {

    },
    readUserData: (req, res) => {
        console.log('Session--------', req.session.user);
        res.status(200).json({user: req.session.user});
    },
    register: (req, res) => {
        const { username, password, email, image, age, favoriteTeams, favoritePlayers, favoriteSport } = req.body;
        const date = new Date().getDate();
        const verification_link = uuid.v4();
        bcrypt.hash(password, saltRounds).then(hashedPassword => {
            const dbInstance = req.app.get('db');
            console.log('Hashed Password--------------', hashedPassword);
            console.log('------favoritePlayers', favoritePlayers);
            console.log('------favoriteTeams', favoriteTeams);            
            dbInstance.register({ username, email, date, image, age, favoriteTeams, favoritePlayers, favoriteSport, password: hashedPassword, verification_link }).then(user => {
                nodemailerCtrl(username, email, verification_link);
                console.log('req-session-user', user[0])
                req.session.user = user[0];
                console.log('req-session-user 222s', req.session.user);
                res.status(200).json({user: req.session.user, message: 'Register User!!'});
            }).catch(err => console.log('Register User Error------------------', err));
        })
    },
    login: (req, res) => {
        const { username, password } = req.body;
        const dbInstance = req.app.get('db');
        console.log(username, password, '--------------')
        dbInstance.find_user(username).then(users => {
            if(users.length) {
                console.log('hit 1', users[0])
                const userData = users[0];
                bcrypt.compare(password, userData.password).then(doPasswordsMatch => {
                    delete userData.password;
                    console.log('hit 2', doPasswordsMatch)
                    if(doPasswordsMatch) {
                        console.log('Hit 3')
                        console.log('-------userData', userData);
                        req.session.user = userData;
                        console.log('b4 send session-----', req.session.user);
                        res.status(200).json({user: userData});
                    } else {
                    res.status(401).json({message: 'Password and Username does not match!!'})
                    }
                })            
            }        
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).json({message: 'Logout successfully!!'});
    },
    updateUser: (req, res) => {

    },
    emailVerification: (req, res) => {
        const dbInstance = req.app.get('db');
        const { verification_link } = req.body;
        dbInstance.find_verification_key(verification_link).then(users => {
            userData = users[0];
            req.session.user = userData;
            console.log('---------------', userData)
            dbInstance.verify_email(userData.verification_link).then(verifiedUser => {
                req.session.user = verifiedUser[0];
                res.json({message: 'Account Verified!!'});
            })
        })
    }
}