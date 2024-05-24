import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import UserCreate from '@/pages/UserCreate';
import Board from '@/components/board/Board';

const CustomRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <UserCreate />,
    },
    {
      path: '/projects/:projectId',
      element: <Board />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default CustomRouterProvider;
