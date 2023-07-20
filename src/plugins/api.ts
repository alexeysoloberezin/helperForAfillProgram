import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'https://helperaffil-alexeysoloberezin.vercel.app/',
});

export default api;


