import { SET_CURRENT_USER } from "../constants";

export const initialAuth = {
    isAuthenticated: false,
    user: null
};

export const authReducer = (state=initialAuth, action)=>{
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: Object.keys(action.payload) !== 0,
                user: action.payload
            }
        default:
            return state
    }
};
