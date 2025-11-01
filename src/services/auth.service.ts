import { redirect } from 'react-router-dom';

const checkAuth = (): boolean => {
  const token = localStorage.getItem('accessToken');
  return !!token;
};

export const authLoader = () => {
  const isAuthenticated = checkAuth();
  if (!isAuthenticated) {
    return redirect('/login');
  }
  return null;
};
