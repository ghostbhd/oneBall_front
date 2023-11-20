import {
  SideBar,
  Dashboard,
  Profile,
  Games,
  Messages,
  Stats,
  Settings,
  Logout,
  Auth,
  CallBack,
} from "./components";
import style from "./style";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useTheme } from "./themeContext";
import { useState } from "react";

const App = () => {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className={`app w-full h-full flex flex-row fixed`}>
        <div
          className={`absolute right-0 top-0 w-full h-full bg-[#0a2028] opacity-50`}
        ></div>
        {/* sidebar ----------------------------------------------------------------- */}
        <SideBar />

        {/* content ----------------------------------------------------------------- */}
        <div
          className={`p-6 px-10 overflow-y-auto
            ${style.backdropBlur} ${style.transition} 
            ${theme.isSidebarCollapsed ? style.contentW2 : style.contentW}
          `}
        >
          <Routes>
            <Route path="/Auth" element={<Auth />} />
            <Route path="/CallBack" element={<CallBack />} />
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
