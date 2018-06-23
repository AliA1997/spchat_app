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
import FavoriteNewsPage from './components/FavoriteNewsPage/FavoriteNewsPage';
//Sports Component 
import NBA from './components/sportsComponents/NBA';
import NFL from './components/sportsComponents/NFL';
import MLB from './components/sportsComponents/MLB';
import NHL from './components/sportsComponents/NHL';
import LaLiga from './components/sportsComponents/LaLiga';
import PremierLeague from './components/sportsComponents/PremierLeague';
import FIFA from './components/sportsComponents/Fifa';

import ErrorNotFoundPage from './components/ErrorNotFoundPage/ErrorNotFoundPage';
import Admin from './components/Admin/Admin';
import PostPage from './components/PostPage/PostPage';
import EditProfilePage from './components/EditProfilePage/EditProfilePage';


export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/users' component={UsersPage} />        
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/admin' component={Admin} />
        <Route path='/edit_profile' component={EditProfilePage} />
        <Route path='/email_verification' component={VerificationPage} />        
        <Route exact path='/login' component={LoginPage}/>
        <Route exact path='/posts' component={PostsPage} />
        <Route path='/posts/:sport/:post' component={PostPage}/>    
                          
        <Route exact path='/sports/nba' component={NBA} />     
        <Route exact path='/sports/nfl' component={NFL} />     
        <Route exact path='/sports/nhl' component={NHL} />     
        <Route exact path='/sports/mlb' component={MLB} />     
        <Route exact path='/sports/premier-league' component={PremierLeague} />     
        <Route exact path='/sports/la-liga' component={LaLiga} />
        <Route exact path='/sports/fifa' component={FIFA} />     

        <Route path='/:post/chat/:chatId' component={ChatPage}/>   
        <Route exact path='/chat/:sportId' component={ChatPage} />     
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/users/:id' component={UserPage} />
        <Route path='/dashboard/create-post' component={CreatePostPage} />    
        <Route path='/dashboard/favorite-news' component={FavoriteNewsPage} /> 
        <Route component={ErrorNotFoundPage} />
    </Switch>
);