import axios from '../lib/axiosConfig';

function execute(value) {
    const api ='/login';
    return axios.post(api, value)
}

export default execute;