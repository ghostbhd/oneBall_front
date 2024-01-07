import React from "react";
import { createRoot } from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./Socketio";
import { ThemeProvider } from "./themeContext";
import "./index.css";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
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
} else {
  console.error("Root element not found in the document.");
}
