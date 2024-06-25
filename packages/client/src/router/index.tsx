import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import UserCreate from '@/pages/UserCreate';
import UserLogin from '@/pages/UserLogin';
import Board from '@/components/board/Board';

const CustomRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/projects/:projectId',
      element: <Board />,
    },
    {
      path: '/sign-up',
      element: <UserCreate />,
    },
    {
      path: '/login',
      element: <UserLogin />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default CustomRouterProvider;
