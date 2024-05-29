/**
 * Citation for the following file:
 * Date: 5/24/2024
 * Adapted from React Starter index.js
 * Deleted BrowserRouter, since Routes are resolved in the App component.
 * Source URL: https://github.com/osu-cs340-ecampus/react-starter-app/blob/main/App/frontend/src/main.jsx
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Bootstraps App component to DOM.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);