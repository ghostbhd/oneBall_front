import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom"; // Router Provider
import { SocketProvider } from "./Socketio.jsx"; // Socket Provider
import { ThemeProvider } from "./themeContext/index.jsx"; // Theme Provider
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router> 
      <SocketProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SocketProvider>
    </Router>
  </React.StrictMode>
);
