import config from '../config';

export default {
    saveToken: token => {
        localStorage.setItem(config.keyJwt, token)
    },
    removeToken: () => {
        localStorage.removeItem(config.keyJwt)
    }
}