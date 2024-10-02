import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const handleLogin = (userData) => {
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return { handleLogin, handleLogout };
};

export default useAuth;
