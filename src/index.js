import React from 'react';
import ReactDOM from 'react-dom';
import DataContextProvider from './context/DataContext';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
