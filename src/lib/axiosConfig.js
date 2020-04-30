import config from '../config';
import axios from 'axios'
var instance = axios.create({
    baseURL: config.API,
    timeout: 10000,
    headers: {
        Authorization: "Bearer " + localStorage.getItem(config.keyJwt)
    }
  });

  export default instance;