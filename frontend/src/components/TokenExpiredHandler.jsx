import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Auth/auth.action';
import axios from 'axios';
import { api } from '../config/api';

// Sets up an Axios interceptor to handle 401 Unauthorized responses
const TokenExpiredHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token is likely expired or invalid
          dispatch(logout());
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );

    const apiInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token is likely expired or invalid
          dispatch(logout());
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
      api.interceptors.response.eject(apiInterceptor);
    };
  }, [dispatch]);

  return null;
};

export default TokenExpiredHandler;
