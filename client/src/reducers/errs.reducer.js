import { GET_ERRS } from "../constants";

export const initialErrs = {};

export const errsReducer= (state=initialErrs, action)=>{
    switch(action.type){
        case GET_ERRS:
            const errs=  {
                ...action.payload
            };
            return {
                ...errs
            }
        default:
            return state
    }
}