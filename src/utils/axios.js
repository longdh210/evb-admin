import axios from 'axios';
import { API_BASE_URL } from '../common/constants';

const instance = axios.create();

export default instance;

const request = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// const getAccessToken = () => {
//   return window.localStorage.getItem('agrimomo_access_token');
// };

// request.interceptors.request.use(async config => {
//   const token = await getAccessToken();
//   if (token) config.headers['token'] = token;
//   return config;
// });

export { request };
