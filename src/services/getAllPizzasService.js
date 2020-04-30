import axios from '../lib/axiosConfig';

function execute(page) {
    const api = page ? '/pizzas?page=' + page : '/pizzas';
    return axios.get(api)
}

export default execute;