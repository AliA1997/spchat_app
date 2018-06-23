const bcrypt = require('bcrypt');
const uuid = require('uuid');
const nodemailerCtrl = require('./nodemailer_controller');
const saltRounds = 12;
module.exports = {
    readUsers: (req, res) => {
        res.status(200).json({message: 'read users'});
    },
    readUser: (req, res) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
        dbInstance.read_user(id)
        .then(user => {
            res.status(200).json({user});
        }).catch(err => console.log('Read User Database Error-----------', err));
    },
    readUsersPosts: (req, res) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
        dbInstance.read_users_posts(id)
        .then(posts => {
            res.status(200).json({posts});
        }).catch(err => console.log('Database get users posts error------', err));
    },
    readUserData: (req, res) => {
        // console.log('Session--------', req.session.user);
        res.status(200).json({user: req.session.user});
    },
    register: (req, res) => {
        const { username, password, email, image, age, date, favoriteTeams, favoritePlayers, favoriteSport } = req.body;
        const verification_link = uuid.v4();
        bcrypt.hash(password, saltRounds).then(hashedPassword => {
            const dbInstance = req.app.get('db');
            console.log('Hashed Password--------------', hashedPassword);
            console.log('------favoritePlayers', favoritePlayers);
            console.log('------favoriteTeams', favoriteTeams);            
            dbInstance.register({ username, email, date, image, age, favoriteTeams, favoritePlayers, favoriteSport, password: hashedPassword, verification_link }).then(user => {
                nodemailerCtrl.verify(username, email, verification_link);
                console.log('req-session-user', user[0])
                req.session.user = user[0];
                console.log('req-session-user 222s', req.session.user);
                res.status(200).json({user: req.session.user, message: 'Register User!!'});
            }).catch(err => console.log('Register User Error------------------', err));
        }).catch(err => console.log('Bcrypt Register Error--------', err));
    },
    login: (req, res) => {
        const { username, password } = req.body;
        const dbInstance = req.app.get('db');
        console.log(username, password, '--------------')
        dbInstance.find_user(username).then(users => {
            if(users.length) {
                console.log('hit 1', users[0])
                const userData = users[0];
                const socialMediaArray = userData.social_media.split(' ');
                for(let i = 0; i < socialMediaArray.length; i++) {
                    if(socialMediaArray[i] === 'twitter' || socialMediaArray[i] === 'facebook' || socialMediaArray[i] === 'snapchat'
                    || socialMediaArray[i] === 'twitchtv' || socialMediaArray[i] === 'playstation' || socialMediaArray[i] === 'xbox' ||
                    socialMediaArray[i] === 'reddit' || socialMediaArray[i] === 'instagram') {
                        socialMediaArray.splice(i, 1);
                    }
                }
                // console.log('socialMedia-----------', socialMediaArray)
                userData.social_media = socialMediaArray;
                bcrypt.compare(password, userData.password).then(doPasswordsMatch => {
                    delete userData.password;
                    console.log('hit 2', doPasswordsMatch)
                    if(doPasswordsMatch) {
                        console.log('Hit 3')
                        req.session.user = userData;
                        console.log('-------userData', req.session.user);
                        req.session.save();
                        console.log('b4 send session-----', req.session.user);
                        res.status(200).json({user: req.session.user});
                    } else {
                    res.status(401).json({message: 'Password and Username does not match!!'})
                    }
                }).catch(err => console.log('Bcrypt login error---------', err));         
            }        
        }).catch(err => console.log('findUser database error---------', err));
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).json({message: 'Logout successfully!!'});
    },
    updateUser: (req, res) => {
        const dbInstance = req.app.get('db');
        const { id } = req.session.user;
        console.log('-----------session', req.session.user);
        const { username, email, image, age, updatedDate, favoriteTeams, favoritePlayers, favoriteSport } = req.body;
        console.log('Updated Date----------', updatedDate);
        if(id) {
            dbInstance.update_user({ id, username, email, date: updatedDate, image, age, favoriteTeams, favoritePlayers, favoriteSport })
            .then(updatedUser => {
                console.log('Updated User-------------', updatedUser);
                nodemailerCtrl.sendUpdate(email, 'Email just got updated!', `http://localhost:3000/users/${id}`);
                res.status(200).json({user: updatedUser});
            }).catch(err => console.log('Database Update User error---------', err));
        }
    },
    resetPassword: (req, res) => {
        const dbInstance = req.app.get('db');
        const { username, password, newPassword } = req.body;
        dbInstance.find_user(username)
        .then(users => {
            bcrypt.compare(password, users[0].password)
            .then(doPasswordsMatch => {
                if(doPasswordsMatch) {
                    dbInstance.reset_password(newPassword)
                    .then(updatedPassword => {
                        res.status(200).json({message: 'Password Resetted!'});
                    })
                } else {
                    res.status(404).json({message: 'Passwords do not match!!'});
                }
            })
        })
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
            }).catch(err => console.log('Verify Email Database error---------', err));
        }).catch(err => console.log('Email Verification Link error-------', err));
    }
}