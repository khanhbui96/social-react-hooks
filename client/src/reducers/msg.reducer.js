import {SEND_MSG, GET_All_MSG} from '../constants'
export const initialMsg = [];
export const msgReducer = (state=initialMsg, action)=>{
    switch(action.type){
        case SEND_MSG:
        console.log(action.payload)
            return [
                ...state,
                action.payload
            ]
        case GET_All_MSG:
        return [
            ...action.payload
        ]
        default:
            return state
    }
}
