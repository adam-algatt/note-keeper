import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import { NoteContextProvider } from './context/NoteContext'
const rootElement = document.getElementById('root');
render(
  
  <NoteContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </NoteContextProvider>,
  rootElement
);

