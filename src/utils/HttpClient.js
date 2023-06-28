import axios from 'axios';
import AuthService from '../services/AuthService';

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER
});

instance.interceptors.request.use((config) => {
    const authUser = AuthService.getAuthUser();
    if (authUser) {
        config.headers['authorization'] = `Bearer ${authUser.access_token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error?.response?.status === 401) { 
        localStorage.removeItem('authUser');
        window.location.reload();
    } else {
        return Promise.reject(error.response);
    }
});

const get = (url, params, config = {}) => instance.get(url, { params, ...config });
const post = (url, data, config = {}) => instance.post(url, data, config);

const methods = { get, post };

export default methods;