import axios from 'axios';

const defaultBaseURL = '/api/'

axios.defaults.withCredentials = true;

export const baseUrl = process.env.REACT_APP_SERVER_URL != null ? process.env.REACT_APP_SERVER_URL : defaultBaseURL;

export default axios.create({
    baseURL: baseUrl
});