import { createBrowserRouter } from 'react-router-dom';

import ChatLayout from '../layouts/ChatLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ChatPlaceholder from '../pages/ChatPlaceholder';
import ChatWindow from '../pages/ChatWindow';
import ErrorPage from '../pages/ErrorPage';

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
    path: '/',
    element: <ChatLayout />,
    errorElement: <ErrorPage />,
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
