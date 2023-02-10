import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { render } from 'react-dom';
import App from './App';
import  NoteContextProvider  from './context/NoteContext'
const rootElement = document.getElementById('root');



const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


