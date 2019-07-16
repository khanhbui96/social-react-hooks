import callApi from "../ultils/callApi";
import setAuthHeader from '../ultils/setAuthHeader';
import {ADD_POST, GET_POSTS, GET_POSTS_ID} from '../constants';

export const addPost = async (data, dispatch)=>{
    try{
        const post = await callApi('post', '/posts/add', data);
        dispatch({
            type: ADD_POST,
            payload: post.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getPosts = async dispatch =>{
    setAuthHeader(localStorage.getItem('jwtToken'));
    try{
        const posts = await callApi('get', '/posts', null)
        dispatch({
            type: GET_POSTS,
            payload: posts.data
        })

    } catch(err){
        console.log(err)
    }
};
export const getPostsById = async (id, dispatch) =>{
    setAuthHeader(localStorage.getItem('jwtToken'));
    try{
        const posts = await callApi('get', `/posts/${id}`, null)
        dispatch({
            type: GET_POSTS_ID,
            payload: posts.data
        })

    } catch(err){
        console.log(err)
    }
};

export const setInteractive = (postId, action, dispatch)=>{
    callApi('post', `/interactive/${postId}/${action}`, null)
        .then(newPost=>{getPosts(dispatch)})
        .catch(err=>alert(err.response.data))
}