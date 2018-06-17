require('dotenv').config();
//Backend Technologies
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const massive = require('massive');

//Extra technologies
const socket = require('socket.io');
//For Storing session store.
const pg  = require('pg');
const pgSession = require('connect-pg-simple')(session);
//Middleware
const checkLogin = require('./middlewaras/checkLoggedIn');
const checkPost = require('./middlewaras/checkPost');
// const checkComment = require('./middlewares/checkComment');
//Controllers
const cloudinaryCtrl = require('./controllers/cloudinary_controller');
const userCtrl = require('./controllers/user_controller');
const postCtrl = require('./controllers/post_controller');
const commentsCtrl = require('./controllers/comments_controller');
const searchCtrl = require('./controllers/search_controller');
const surveyCtrl = require('./controllers/survey_controller');
const PORT = 9999;
let socketDB = null;
const app = express();
app.use(helmet());
app.use(express.static('public'));

app.use(bodyParser.json());


massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
    socketDB = database;
})


app.use(session({
    
    store: session ? new pgSession({
        //Connect to session to the store
        conString: process.env.CONNECTION_STRING,
    }) : null,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secure: true
    }
}));


//Cloudinary Endpoints 
app.get('/api/upload', cloudinaryCtrl.upload)

//Get User endpoints 
app.get('/api/users', userCtrl.readUsers);
app.get('/api/user-data', userCtrl.readUserData);
//Rare use case endpoint
app.get('/api/users/:id', userCtrl.readUser);

//Get Postss Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.get('/api/user-posts', postCtrl.readUserPosts);
app.get('/api/posts/:post_id', postCtrl.readPost);
//Get Posts By SPorts Endpoints 
app.get('/api/posts/sports/:sport', postCtrl.readPostBySport);

//Get Comment Endpoints 
app.get('/api/comments/:post_id', commentsCtrl.readComments);

//Get Survey Endpoints 
app.get('/api/survey/:id', surveyCtrl.readSurvey);

//Post User Endpoints
app.post('/api/register', userCtrl.register);
app.post('/api/login', userCtrl.login);
app.post('/api/logout', userCtrl.logout);

//Post Postss Endpoints
app.post('/api/posts', postCtrl.createPost);

//Post Comment Endpoints 
app.post('/api/comments/:post_id', commentsCtrl.createComment);

//Put User Endpoints 
app.put('/api/users', userCtrl.updateUser);
//Verify User Endpoints 
app.put('/email_verification', userCtrl.emailVerification);

//Put Postss Endpoints 
app.put('/api/posts', checkPost, postCtrl.updatePost);

//Put Comment Endpoints 
app.put('/api/comments/:post_id/:comment_id', commentsCtrl.updateComment);

//Delete Postss Endpoints 
app.delete('/api/posts', checkPost, postCtrl.deletePost);

//Delete Comments Endpoints 
app.delete('/api/comments/:post_id/:comment_id', commentsCtrl.deleteComment);

//Search Get EndPoints  
app.get('/api/search/users', searchCtrl.readUsersSearch);
app.get('/api/search/posts', searchCtrl.readPostsSearch)
app.get('/api/search/sports', searchCtrl.readSportPostsSearch);

const server = app.listen(PORT, () => console.log(`Listening on Port:${PORT}!`));

//Socket.io configuration, and event emitters
const io = socket(server);

const nba = io.of('/nba')
const nfl = io.of('/nfl')
const mlb = io.of('/mlb')
const nhl = io.of('/nhl')

let nbaUsers = [];
let nbaMessages = [];
let nflUsers = [];
let nflMessages = [];
let mlbUsers = [];
let mlbMessages = [];
let nhlUsers = [];
let nhlMessages = [];

nba.on('connection', (socket) => {
    console.log('NBA Namespace connected'); 
    const filteredUser = socket.handshake.query.username !== 'Anonymous' && nbaUsers.filter(user => user === socket.handshake.query.username);
    !filteredUser.length && nbaUsers.push(`${socket.handshake.query.username}`) 

    console.log(nbaUsers);
    console.log('imageurl-----------', socket.handshake.query.imageurl);
    console.log('topic----------', socket.handshake.query.topic);
    socket.broadcast.emit('SEND_USER', nbaUsers);
    console.log(nbaUsers);
    socket.on('TYPING', (data) => {
        console.log('typing----------', socket.handshake.query.username);
        socket.broadcast.emit('USER_ON_TYPING', data);
    })
    socket.on('SEND_MESSAGE', (data) => {
        console.log('Message sent.', data.message);
        data.username = socket.handshake.query.username;
        data.imageurl = socket.handshake.query.imageurl;
        nbaMessages.push(data);
        console.log(nbaMessages);
        nba.emit('RECIEVE_MESSAGE', data);
    });
    socket.on('disconnect', () => {
        console.log('Disconnected from nba namespace');
    });
})

mlb.on('connection', (socket) => {
    console.log('MLB Namespace connected');
    const filteredUser = socket.handshake.query.username !== 'Anonymous' && mlbUsers.filter(user => user === socket.handshake.query.username);
    !filteredUser.length && mlbUsers.push(`${socket.handshake.query.username} #${mlbUsers.length}`) 
    console.log(mlbUsers);
    socket.broadcast.emit('SEND_USER', mlbUsers);
    socket.on('TYPING', (data) => {
        console.log('typing----------', socket.handshake.query.username);
        socket.broadcast.emit('USER_ON_TYPING', data);
    })
    socket.on('SEND_MESSAGE', (data) => {
        data.username = socket.handshake.query.username;
        mlbMessages.push(data)
        console.log('MLB Message sent!');
        mlb.emit('RECIEVE_MESSAGE', data);
    })
    socket.on('disconnect', () => {
        console.log('Disconnected from mlb namespace');
    })
})

nfl.on('connection', (socket) => {
    console.log('NFL Namespace connected');
    const filteredUser = socket.handshake.query.username !== 'Anonymous' && nflUsers.filter(user => user === socket.handshake.query.username);
    !filteredUser.length && nflUsers.push(`${socket.handshake.query.username} #${nflUsers.length}`) 
    console.log(nflUsers);
    socket.broadcast.emit('SEND_USER', nflUsers);
    socket.on('TYPING', (data) => {
        console.log('typing----------', socket.handshake.query.username);
        socket.broadcast.emit('USER_ON_TYPING', data);
    })
    socket.on('SEND_MESSAGE', (data) => {
        data.username = socket.handshake.query.username;
        nflMessages.push(data)
        console.log('NFL Message sent!');
        nfl.emit('RECIEVE_MESSAGE', data);
    })    
    socket.on('disconnect', () => {
        console.log('Disconnected from nfl namespace');
    })
})

nhl.on('connection', (socket) => {
    console.log('NHL Namespace connected');
    const filteredUser = socket.handshake.query.username !== 'Anonymous' && nhlUsers.filter(user => user === socket.handshake.query.username);
    !filteredUser.length && nhlUsers.push(`${socket.handshake.query.username} #${nhlUsers.length}`) 
    console.log(nhlUsers);
    socket.broadcast.emit('SEND_USER', nhlUsers);
    socket.on('TYPING', (data) => {
        console.log('typing----------', socket.handshake.query.username);
        socket.broadcast.emit('USER_ON_TYPING', data);
    })
    socket.on('SEND_MESSAGE', (data) => {
        data.username = socket.handshake.query.username;
        nhlMessages.push(data);
        console.log('NHL Message sent!');
        nhl.emit('RECIEVE_MESSAGE', data);
    })
    socket.on('disconnect', () => {
        console.log('Disconnected from nhl namespace');
    });
});
