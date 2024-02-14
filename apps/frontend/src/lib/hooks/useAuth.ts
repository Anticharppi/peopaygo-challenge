import { User } from '@ocmi/frontend/types';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useDispatch';
import { signInReducer, signOutReducer } from '../features/auth';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const storeUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const storeToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  const signIn = (user: User) => {
    storeUser(user);
    dispatch(signInReducer(user));
  };

  const getTokenAndUser = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') as string);
    return {
      token,
      user,
    };
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(signOutReducer());
  };

  return {
    ...auth,
    signIn,
    signOut,
    storeUser,
    storeToken,
    getTokenAndUser,
  };
};
