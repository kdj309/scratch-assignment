import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ThemeWrapper from './context/ThemeWrapper.tsx';
import { ActionContextWrapper } from './context/ActionsWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeWrapper>
      <DndProvider backend={HTML5Backend}>
        <ActionContextWrapper>
          <App />
        </ActionContextWrapper>
      </DndProvider>
    </ThemeWrapper>
  </StrictMode>
);
