import axios from 'axios';
import { WEB_API_URL } from '../../Constants/config';
axios.defaults.baseURL = WEB_API_URL;
axios.defaults.headers.common['token'] = "Tesr";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.interceptors.request.use(request => {
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
export default {
    post: axios.post,
    get: axios.get,
    all: axios.all,
    delete:axios.delete
}