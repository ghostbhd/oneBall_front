import React, { useEffect } from "react";
import {
  SideBar,
  Dashboard,
  Profile,
  Games,
  Messages,
  Stats,
  Settings,
  MSideBar,
  NavBar,
  UserProfile,
  Auth,
  CallBack,
  Error_404,
} from "./components";
import WelcomeBack from "./components/WelcomeBack";

import { GameShell } from "./pniw_pong/index";
import style from "./style";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTheme } from "./themeContext";
import { ImgBg } from "./style";
import Cookies from "js-cookie";

const App: React.FC = () => {
  const { theme } = useTheme();
  const isAuth = Cookies.get("accessToken") ? true : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      // navigate("/Auth");
      return;
    }
  }, [isAuth]);

  return (
    <div
      className={`w-full h-full flex flex-row fixed`}
      style={ImgBg({ img: "/src/assets/bg contain.png" })}
    >
      {/* backdrop ----------------------------------------------------------------- */}
      <div
        className={`absolute right-0 top-0 w-full h-full bg-bDark_5/60 ${style.backdropBlur}`}
      ></div>
      {/* Authentication ---------------------------------------------------------- */}
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Callback" element={<CallBack />} />
        <Route path="/welcomeback" element={<WelcomeBack />} />

        <Route
          path="*"
          element={
            <>
              {/* sidebar ----------------------------------------------------------------- */}
              <SideBar />
              {/* mobile sidebar ---------------------------------------------------------- */}
              <MSideBar />
              {/* navbar ----------------------------------------------------------------- */}
              <NavBar />
              {/* content ----------------------------------------------------------------- */}
              <div
                className={`flex flex-wrap overflow-y-auto relative xl:px-52 md:pt-0 pt-16
                    ${
                      theme.isSidebarCollapsed
                        ? style.contentW2
                        : style.contentW
                    }
                      `}
              >
                {/* routes ----------------------------------------------------------------- */}
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="/Ingame" element={<GameShell />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/Messages" element={<Messages />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile/:username" element={<UserProfile />} />

                  <Route path="*" element={<Error_404 />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
