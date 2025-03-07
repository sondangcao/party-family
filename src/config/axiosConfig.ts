import axios from 'axios';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';
import responseHelper from './response.helper';

export const BASE_URL = 'http://192.168.1.104:3000';

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
  async errorRes => {
    const error = errorRes.response || errorRes;
    console.log('Axios Error:', JSON.stringify(errorRes, null, 2));
    if (error.status === 401) {
      console.log('authozied');
      await AsyncStorage.removeItem('token');
      //   store.dispatch(logoutAction());
      return Promise.resolve();
    }

    if (!error.config?.headers.unNotifyError) {
      responseHelper.notificationError(error);
    }
    throw error;
  },
);

export default axiosClient;
