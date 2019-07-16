import React from 'react';
import Home from './components/Social/Index';
import SignInUp from './components/AuthForm/Index';
import ChatRoom from './components/ChatBox/Index';
import ChatBox from './components/ChatBox/ChatBox';
import Carousel from './components/Index';
import Profile from './components/Social/Profile'
import Search from './components/Social/Search';

const routes  = [
    {
        path:'/home',
        exact: false,
        component:()=><Home/>
    },
    {
        path: '/',
        exact: true,
        component:()=> <Carousel/>
    },
    {
        path: '/user/:userId',
        exact: true,
        component:({match})=> <Profile match = {match}/>
    },
    {
        path: '/form',
        exact: false,
        component: ()=><SignInUp/>
    },
    {
        path: '/users/search',
        exact: false,
        component: ()=><Search/>
    },
    {
        path: '/chat',
        exact: true,
        component: ()=><ChatRoom/>
    },
    {
        path: '/chat/:id',
        exact: false,
        component: ()=><ChatBox />
    }
];

export default routes