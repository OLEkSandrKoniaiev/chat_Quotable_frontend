import { createBrowserRouter, redirect } from 'react-router-dom';

import ChatLayout from '../layouts/ChatLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ChatPlaceholder from '../pages/ChatPlaceholder';
import ChatWindow from '../pages/ChatWindow';
import ErrorPage from '../pages/ErrorPage';
import { AuthSuccessPage } from '../pages/AuthSuccessPage';

const checkAuth = (): boolean => {
  const token = localStorage.getItem('accessToken');
  return !!token;
};

const authLoader = () => {
  const isAuthenticated = checkAuth();
  if (!isAuthenticated) {
    return redirect('/login');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/auth/success',
    element: <AuthSuccessPage />,
  },
  {
    path: '/',
    element: <ChatLayout />,
    errorElement: <ErrorPage />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <ChatPlaceholder />,
      },
      {
        path: 'chat/:chatId',
        element: <ChatWindow />,
      },
    ],
  },
]);
