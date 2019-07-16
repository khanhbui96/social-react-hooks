import {FOLLOW_USER, UNFOLLOW_USER} from '../constants'
export const initialFollow = {value: false};
export const followReducer = (state=initialFollow, action)=>{
    switch(action.type){
        case FOLLOW_USER:
            return {value: false}
        case UNFOLLOW_USER:
            return {value: true}
        default:
            return state
    }
}