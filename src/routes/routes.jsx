import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Tasks from '../pages/Tasks';
import Chat from '../pages/Chat';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Archive from '../pages/Archive';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/AuthPage';
import Private from '../components/layouts/Private';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Private><App /></Private>,
    children: [
      {
        index: '/',
        element: <Tasks />,
      },
      {
        path:'/archive',
        element:<Archive></Archive>

      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      
    ],
  },
  {
    path:'/login',
    element:<LoginPage></LoginPage>
  },
  {
    path:'/auth',
    element:<RegisterPage></RegisterPage>
  }
]);

export default routes;
