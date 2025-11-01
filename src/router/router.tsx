import { createBrowserRouter } from 'react-router-dom';

import ChatLayout from '../layouts/ChatLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ChatPlaceholder from '../pages/ChatPlaceholder';
import ChatWindow from '../pages/ChatWindow';
import ErrorPage from '../pages/ErrorPage';
import { AuthSuccessPage } from '../pages/AuthSuccessPage';
import { authLoader } from '../services/auth.service';

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
