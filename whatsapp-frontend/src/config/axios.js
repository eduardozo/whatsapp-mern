import axios from 'axios';

const baseURL = (process.env.NODE_ENV === 'production') ?
    process.env.REACT_APP_AXIOS_PROD_HOST : process.env.REACT_APP_AXIOS_DEV_HOST;

const instance = axios.create({
    baseURL: baseURL,
});

export default instance;