import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Auth/auth.action';

// Checks JWT expiry and logs out if expired
const TokenExpiredHandler = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('jwt');
      if (!token) return;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          dispatch(logout());
          window.location.href = '/login';
        }
      } catch (e) {}
    };
    checkToken();
    const interval = setInterval(checkToken, 60000); // check every minute
    return () => clearInterval(interval);
  }, [dispatch]);
  return null;
};

export default TokenExpiredHandler;
