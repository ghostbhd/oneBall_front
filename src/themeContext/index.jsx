// ThemeContext.js
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const defaultTheme = {
  isSidebarCollapsed: false,
  toggleSidebar: () => {},
};

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleSidebar = () => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      isSidebarCollapsed: !prevTheme.isSidebarCollapsed,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleSidebar }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
