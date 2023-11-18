import {
  SideBar,
  Dashboard,
  Profile,
  Games,
  Messages,
  Stats,
  Settings,
  Logout,
  MSideBar,
  NavBar,
} from "./components";
import style from "./style";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useTheme } from "./themeContext";

import { ImgBg } from "./style";

const App = () => {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div className={` w-full h-full flex flex-row fixed`} style={ImgBg({img : "/src/assets/bg contain.png"})}>
        <div
          className={`absolute right-0 top-0 w-full h-full bg-[#0a2028] opacity-50`}
        ></div>
        {/* sidebar ----------------------------------------------------------------- */}
        <SideBar />
        {/* mobile sidebar ---------------------------------------------------------- */}
        <MSideBar />
        {/* navbar ----------------------------------------------------------------- */}
        <NavBar />

        {/* content ----------------------------------------------------------------- */}
        <div
          className={`overflow-y-auto
            ${style.backdropBlur} ${style.transition} 
            ${theme.isSidebarCollapsed ? style.contentW2 : style.contentW}
          `}
        >

          {/* routes ----------------------------------------------------------------- */}
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
