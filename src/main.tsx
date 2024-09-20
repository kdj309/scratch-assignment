import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ActionContextWrapper } from './context/ActionsWrapper.tsx';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ActionContextWrapper>
        <RouterProvider router={routes}></RouterProvider>
      </ActionContextWrapper>
    </DndProvider>
  </StrictMode>
);
