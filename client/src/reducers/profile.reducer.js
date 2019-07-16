import {GET_PROFILE} from '../constants';

export const initialProfile = {
    loaded: false,
    profile: {}
};

export const profileReducer = (state=initialProfile, action)=>{
    switch(action.type){
        case GET_PROFILE:
            return {
                loaded: true,
                profile: {...action.payload}
            }
        default:
            return state
    }
}
