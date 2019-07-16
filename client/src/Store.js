import React,{createContext, useReducer} from 'react';
import callApi from './ultils/callApi';
import setAuthHeader from './ultils/setAuthHeader';
import { SEND_MSG} from './constants';
import {initialMsg, msgReducer} from './reducers/msg.reducer';
import {initialErrs, errsReducer } from './reducers/errs.reducer';
import {initialAuth, authReducer} from './reducers/auth.reducer';
import {initialPost, postReducer} from './reducers/post.reducer';
import {initialProfile, profileReducer} from './reducers/profile.reducer'
import {initialSearch, searchReducer} from './reducers/search.reducer';
import {initialUsers, usersReducer} from './reducers/users.reducer';
import {initialFollow, followReducer} from './reducers/follow.reducer'
import io from 'socket.io-client';
export const CTX = createContext();

let socket
const sendMsg = (value)=>{
    socket.emit('chat messages', value)
}
const Store = props=>{
    const msgs = useReducer(msgReducer, initialMsg);
    const errs = useReducer(errsReducer, initialErrs);
    const auth = useReducer(authReducer, initialAuth);
    const post = useReducer(postReducer,initialPost);
    const profile = useReducer(profileReducer, initialProfile);
    const search = useReducer(searchReducer, initialSearch);
    const users = useReducer(usersReducer, initialUsers );
    const follow = useReducer(followReducer, initialFollow)
    if(!socket){
        socket = io(':5000');
        socket.on('chat messages', function({msg, id}){
            setAuthHeader(localStorage.getItem('jwtToken'));
            callApi('post', '/msg/send', {msg, id})
                .then(res=>{
                    console.log(res)
                    return msgs[1]({
                        type: SEND_MSG,
                        payload: res.data
                    })})
                .catch(err=>console.log(err))
        });
    }
    return(
        <CTX.Provider value={{msgs, errs, auth, post, profile, follow,  search, users, sendMsg}}>
            {props.children}
        </CTX.Provider>
    )
};

export default Store