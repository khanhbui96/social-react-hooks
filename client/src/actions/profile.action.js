import  {GET_PROFILE} from '../constants';
import callApi from '../ultils/callApi';
import setAuthHeader from '../ultils/setAuthHeader';
export const getProfile = (id, dispatch) =>{
    setAuthHeader(localStorage.getItem('jwtToken'));
    callApi('get', `/users/profile/${id}`, null)
        .then(data=>dispatch({
            type: GET_PROFILE,
            payload: data.data
        }))
        .catch(err=>console.log(err))
};

export const followUser = (id, dispatch) => {
    setAuthHeader(localStorage.getItem('jwtToken'));
    callApi('get', `/users/follow/${id}`, null)
        .then(data=>{})
        .catch(err=>alert(err.response.data))
};
export const unfollowUser = (id, dispatch) => {
    setAuthHeader(localStorage.getItem('jwtToken'));
    callApi('get', `/users/unFollow/${id}`, null)
        .then(data=>{})
        .catch(err=>alert(err.response.data))
};
// export const getStatusFollow = (user, profile, dispatch)=>{
//     const lengthFollower = profile.followers.filter(item=>{
//         return item._id === user._id
//       }).length;
//       if (lengthFollower){
//         dispatch({
//             type: FOLLOW_USER,
//         })
//       }else{
//         dispatch({
//             type: UNFOLLOW_USER,
//         })
//       }
// }