import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./themeContext/index.jsx"; // Import your ThemeProvider here
import './index.css';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
);
