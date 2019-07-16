import axios from 'axios';

const setAuthHeader = (token)=>{
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }else{
        axios.defaults.headers.common['Authorization'] = null
    }
};

export default setAuthHeader
