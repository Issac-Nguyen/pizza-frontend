import axios from '../lib/axiosConfig';

function execute(value) {
    const api ='/register';
    return axios.post(api, value)
}

export default execute;