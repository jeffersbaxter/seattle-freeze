/**
 * Citation for the following file:
 * Date: 5/24/2024
 * Copied from auto-generated create-react-app index.js
 * This was used when our frontend was a standard React App. The app on the classwork servers 
 *      is bootstrapped in the main.jsx file. This file will be used if we want to run the frontend
 *      through React.
 * Source URL: https://github.com/react-cosmos/create-react-app-example/blob/master/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Get DOM element to bootstrap app to.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Bootstraps App component to DOM.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
