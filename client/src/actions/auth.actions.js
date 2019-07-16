
import  {GET_ERRS, SET_CURRENT_USER} from '../constants';
import callApi from '../ultils/callApi';
import setAuthHeader from '../ultils/setAuthHeader';
export const getCurrentUser = (dispatch) =>{
    setAuthHeader(localStorage.getItem('jwtToken'));
    callApi('get', '/users/currentUser', null)
        .then(data=>dispatch({
            type: SET_CURRENT_USER,
            payload: data.data
        }))
        .catch(err=>console.log(err))
};
export const signInUser = (data, history, dispatchErrs, dispatchAuth)=>{
    callApi('post','/users/login', data)
        .then(user=>{
            localStorage.setItem('jwtToken', user.data.token);
            setAuthHeader(user.data.token);
            getCurrentUser(dispatchAuth);
            history.push('/home');
        })
        .catch(err=>{dispatchErrs({
            type: GET_ERRS,
            payload: err.response.data
        })})
}
export const signUpUser = (data, dispatch, func)=>{
    callApi('post', '/users/register', data)
        .then(user=>{
            func()
        })
        .catch(err=>{
            dispatch({
            type: GET_ERRS,
            payload: err.response.data
        })})
    
};