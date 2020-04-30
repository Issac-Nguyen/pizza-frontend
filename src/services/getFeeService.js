import axios from '../lib/axiosConfig';

function execute(value) {
    const api ='/fee';
    return axios.post(api, value)
}

export default execute;