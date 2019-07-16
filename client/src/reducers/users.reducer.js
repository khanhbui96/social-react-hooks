import { GET_USERS } from "../constants";

export const initialUsers = {
    isLoaded: false,
    users: []
};

export const usersReducer = (state=initialUsers, action)=>{
    switch(action.type){
        case GET_USERS:
            return {
                isLoaded: true,                
                users: [...action.payload]
            }
        default:
            return state
    }
};
