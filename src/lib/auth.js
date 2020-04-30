import config from '../config';

export default {
    saveToken: token => {
        console.log(token)
        localStorage.setItem(config.keyJwt, token)
    },
    removeToken: () => {
        localStorage.removeItem(config.keyJwt)
    }
}