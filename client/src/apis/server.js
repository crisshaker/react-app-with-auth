import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  err => Promise.reject(err)
);

export default instance;
