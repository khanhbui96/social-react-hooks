import  {GET_SEARCH} from '../constants';
import callApi from '../ultils/callApi';
import setAuthHeader from '../ultils/setAuthHeader';

export const getSearch = (value, dispatch) =>{
    setAuthHeader(localStorage.getItem('jwtToken'));
  
    callApi('post', `/users/search`, value)
        .then(data=>{ dispatch({
            type: GET_SEARCH,
            payload: data.data
        })})
        .catch(err=>console.log(err))
};