import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/index.css';
import App from './components/App/App';

import Search from "./components/Search/Search";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Search></Search>
    <App/>
  </React.StrictMode>
);


