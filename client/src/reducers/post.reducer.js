import {ADD_POST, GET_POSTS, GET_POSTS_ID} from '../constants';

export const initialPost = {
    isUpdate: false,
    posts: []
};

export const postReducer = (state=initialPost, action)=>{
    switch(action.type){
        case GET_POSTS_ID:
            return {
                isUpdate: true,
                posts: [...action.payload]
            }
        case GET_POSTS:
            return {
                isUpdate: false,
                posts: [...action.payload]
            }
        case ADD_POST:
                return {
                    isUpdate: true,
                    posts: [
                            action.payload,
                            ...state.posts
                    ]
                }
        default:
            return state
    }
};
