import axios from 'axios';

const callApi = (method, endpoint, data)=>{
    return axios({
        method,
        data,
        url: `http://localhost:5000/api${endpoint}`
    })
};

export default callApi