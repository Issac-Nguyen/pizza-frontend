import axios from 'axios';
import config from '../config'

function execute(timeStart, timeEnd) {
    const api ='/api/history?timeStart=' + timeStart + '&timeEnd=' + timeEnd;
    return axios.get(api, {headers: {
        Authorization: "Bearer " + localStorage.getItem(config.keyJwt)
    }})
}

export default execute;