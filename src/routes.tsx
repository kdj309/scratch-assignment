import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import AllSprites from './components/Sprites.tsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sprites',
    element: <AllSprites />,
  },
]);
