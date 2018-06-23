require('dotenv').config();
//Backend Technologies
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const massive = require('massive');
const path = require('path');
//Extra technologies
const socket = require('socket.io');
//For Storing session store.
const pg  = require('pg');
const pgSession = require('connect-pg-simple')(session);
const { Posts } = require('./helpers/PostsClass');
//Middleware
const checkLogin = require('./middlewaras/checkLoggedIn');
const checkPost = require('./middlewaras/checkPost');
// const checkComment = require('./middlewares/checkComment');
//Controllers
const socialMediaCtrl = require('./controllers/social_media_controller');
const adminCtrl = require('./controllers/admin_controller');
const cloudinaryCtrl = require('./controllers/cloudinary_controller');
const userCtrl = require('./controllers/user_controller');
const postCtrl = require('./controllers/post_controller');
const commentsCtrl = require('./controllers/comments_controller');
const searchCtrl = require('./controllers/search_controller');
const statsCtrl = require('./controllers/stats_controller');
const surveyCtrl = require('./controllers/survey_controller');
const PORT = 9999;
let socketDB;
const app = express();
app.use(helmet());
app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
    socketDB = database;
    // console.log('socketDB----------', socketDB);
}).catch(err => console.log('Massive Connection Error---------', err));

app.use(session({
    
    store: session && new pgSession({
        //Connect to session to the store
        conString: process.env.CONNECTION_STRING,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        // secure: true
    }
}));

//Global Endpoint 
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// })
//Cloudinary Endpoints 
app.get('/api/upload', cloudinaryCtrl.upload)

//Get User endpoints 
app.get('/api/users', userCtrl.readUsers);
app.get('/api/user-data', userCtrl.readUserData);
//Rare use case endpoint
app.get('/api/users/:id', userCtrl.readUser);
app.get('/api/posts/:id', userCtrl.readUsersPosts);

//Get Postss Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.get('/api/recent-posts', postCtrl.readRecentPosts);
app.get('/api/user-posts', postCtrl.readUserPosts);
app.get('/api/posts/:post_id', postCtrl.readPost);
//Get Posts By SPorts Endpoints 
app.get('/api/posts/sports/:sport', postCtrl.readPostBySport);

//Get Comment Endpoints 
app.get('/api/comments/:post_id', commentsCtrl.readComments);

//Get Survey Endpoints 
app.get('/api/survey', surveyCtrl.readHomeSurvey);
app.get('/api/survey/:sport_id', surveyCtrl.readSurvey);

//Admin Get Endpoints
app.get('/api/admin/users', adminCtrl.readAdminUsers);
app.get('/api/admin/users/:id', adminCtrl.readAdminUser);
app.get('/api/admin/posts', adminCtrl.readAdminPosts);

//Stats Get Endpoints 
app.get('/api/stats/:sport', statsCtrl.readStats);

//Post User Endpoints
app.post('/api/register', userCtrl.register);
app.post('/api/login', userCtrl.login);
app.post('/api/logout', userCtrl.logout);

//Post Social Media Endpoints 
app.post('/api/social-media/twitter', socialMediaCtrl.createTwitter);
app.post('/api/social-media/facebook', socialMediaCtrl.createFacebook);
app.post('/api/social-media/instagram', socialMediaCtrl.createInstagram);
app.post('/api/social-media/snapchat', socialMediaCtrl.createSnapchat);
app.post('/api/social-media/twitchtv', socialMediaCtrl.createTwitchTv);
app.post('/api/social-media/reddit', socialMediaCtrl.createReddit);
app.post('/api/social-media/playstation', socialMediaCtrl.createPlaystation);
app.post('/api/social-media/xbox', socialMediaCtrl.createXbox);

//Post Postss Endpoints
app.post('/api/posts', postCtrl.createPost);

//Post Comment Endpoints 
app.post('/api/comments/:post_id', commentsCtrl.createComment);

//Admin Post Endpoints 
app.post('/api/warning', adminCtrl.issueUserWarning);

//Put User Endpoints 
app.put('/api/users', userCtrl.updateUser);
//REset User Endpoints 
app.patch('/api/reset_password', userCtrl.resetPassword);
//Verify User Endpoints 
app.put('/email_verification', userCtrl.emailVerification);

//Put Postss Endpoints 
app.put('/api/posts', checkPost, postCtrl.updatePost);

//Patch Posts Endpoint
app.patch('/api/posts/liked', postCtrl.updatePoints)

//Put Comment Endpoints 
app.put('/api/comments/:post_id/:comment_id', commentsCtrl.updateComment);

//Delete Postss Endpoints 
app.delete('/api/posts', checkPost, postCtrl.deletePost);

//Delete Comments Endpoints 
app.delete('/api/comments/:post_id/:comment_id', commentsCtrl.deleteComment);

//Delete Admin Endpoints 
app.delete('/api/admin/users/:user_id', adminCtrl.deleteAdminUser);
app.delete('/api/admin/posts/:post_id', adminCtrl.deleteAdminPost);

//Search Get EndPoints  
app.get('/api/search/users', searchCtrl.readUsersSearch);
app.get('/api/search/posts', searchCtrl.readPostsSearch)
app.get('/api/search/sports', searchCtrl.readSportPostsSearch);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })
const server = app.listen(PORT, () => console.log(`Listening on Port:${PORT}!`));

//Socket.io configuration, and event emitters
const io = socket(server);

setTimeout(() => {
    require('./socket/socket')(io, Posts, socketDB);
}, 2000);
