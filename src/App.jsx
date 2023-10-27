import {
  SideBar,
  Dashboard,
  Profile,
  Games,
  Messages,
  Stats,
  Settings,
  Logout,
} from "./components";
import style from "./style";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useTheme } from "./themeContext";

const App = () => {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <div className={`app w-full h-full flex flex-row fixed`}>
        <div
          className={`absolute right-0 top-0 w-full h-full bg-[#0a2028] opacity-50`}
        ></div>
        <SideBar />
        <div
          className={`content flex flex-wrap p-4 overflow-y-auto ${
            theme.isSidebarCollapsed ? style.contentW2 : style.contentW
          } ${style.backdropBlur} transition-all duration-500`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/games" element={<Games />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
