import axios from '../lib/axiosConfig';

function execute(value) {
    const api ='/order';
    return axios.post(api, value)
}

export default execute;