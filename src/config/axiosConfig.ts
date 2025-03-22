import axios from 'axios';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoutAction} from '../redux/slices/authSlice';
import {store} from '../redux/store';

export const BASE_URL = 'http://192.168.16.106:3000';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response) {
      console.log(error.response?.data);
    }
    if (error.status === 401) {
      await AsyncStorage.removeItem('token');
      store.dispatch(logoutAction(false));
      return Promise.resolve();
    }
    throw error;
  },
);

export default axiosClient;
