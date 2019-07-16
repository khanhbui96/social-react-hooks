
import callApi from '../ultils/callApi';
import setAuthHeader from '../ultils/setAuthHeader';
import {GET_All_MSG, GET_USERS} from '../constants';


export  const getAllMsgs = (dispatch)=>{
    setAuthHeader(localStorage.getItem('jwtToken'));
    callApi('get', '/msg', null)
        .then(res=>{
            dispatch(
                {
                    type: GET_All_MSG,
                    payload: res.data
                })})
        .catch(err=>console.log(err))
};
export  const getMsgsById = (id, dispatch)=>{
    setAuthHeader(localStorage.getItem('jwtToken'));
    callApi('get', `/msg/${id}`, null)
        .then(res=>{
            dispatch(
                {
                    type: GET_All_MSG,
                    payload: res.data
                })})
        .catch(err=>console.log(err))
};
export  const getUsers = (dispatch)=>{
    setAuthHeader(localStorage.getItem('jwtToken'));
    callApi('get', '/users', null)
        .then(res=>{
            dispatch(
                {
                    type: GET_USERS,
                    payload: res.data
                })})
        .catch(err=>console.log(err))
}