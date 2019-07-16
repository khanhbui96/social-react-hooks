import {GET_SEARCH} from '../constants';

export const initialSearch = {
    loaded: false,
    search: {}
};

export const searchReducer = (state=initialSearch, action)=>{
    switch(action.type){
        case GET_SEARCH:
            return {
                loaded: true,
                search: {
                    ...action.payload
                }
            }
        default:
            return state
    }
}
