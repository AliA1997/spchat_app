import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import ChatPage from './components/ChatPage/ChatPage';
import VerificationPage from './components/VerificationPage/VerificationPage';
import UserPage from './components/UserPage/UserPage';
import UsersPage from './components/UsersPage/UsersPage';
import CreatePostPage from './components/CreatePostPage/CreatePostPage';
import PostsPage from './components/PostsPage/PostsPage';
import Dashboard from './components/Dashboard/Dashboard';
import SportsPage from './components/SportsPage/SportsPage';
import ErrorNotFoundPage from './components/ErrorNotFoundPage/ErrorNotFoundPage';
import PostPage from './components/PostPage/PostPage';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/users' component={UsersPage} />        
        <Route path='/register/:registration_id' component={RegisterPage} />
        <Route path='/email_verification' component={VerificationPage} />        
        <Route path='/login' component={LoginPage}/>
        <Route exact path='/posts' component={PostsPage} />
        <Route path='/posts/:sport/:post' component={PostPage}/>                      
        <Route exact path='/sports/:sport' component={SportsPage} />        
        <Route path='/:post/chat/:chatId' component={ChatPage}/>   
        <Route exact path='/chat/:sportId' component={ChatPage} />     
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/dashboard/account' component={UserPage} />
        <Route path='/dashboard/create-post' component={CreatePostPage} />     
        <Route component={ErrorNotFoundPage} />
    </Switch>
);