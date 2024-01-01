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
import style from "./style";

import { SocketProvider } from "./Socketio";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

import { useTheme } from "./themeContext";

import { ImgBg } from "./style";

const App = () => {
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);

  const fadeInAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(200px)",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <SocketProvider>
      <BrowserRouter>
        <div
          className={`w-full h-full flex flex-row fixed`}
          style={ImgBg({ img: "/src/assets/bg contain.png" })}
        >
          {/* Authentication ---------------------------------------------------------- */}
          <Routes>
            <Route path="/Auth" element={<Auth />} />
            <Route path="/Callback" element={<CallBack />} />

            <Route
              path="*"
              element={
                <>
                  {/* backdrop ----------------------------------------------------------------- */}
                  <div
                    className={`absolute right-0 top-0 w-full h-full bg-bDark_5/60 ${style.backdropBlur}`}
                  ></div>
                  {/* sidebar ----------------------------------------------------------------- */}
                  <SideBar />
                  {/* mobile sidebar ---------------------------------------------------------- */}
                  <MSideBar />
                  {/* navbar ----------------------------------------------------------------- */}
                  <NavBar />
                  {/* content ----------------------------------------------------------------- */}
                  <div
                    className={`flex flex-wrap overflow-y-auto relative xl:px-50 md:pt-0 pt-16
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
                      <Route path="/games" element={<Games />} />
                      <Route path="/messages" element={<Messages />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/stats" element={<Stats />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route
                        path="/profile/:username"
                        element={<UserProfile />}
                      />
                      <Route path="*" element={<Error_404 />} />
                    </Routes>
                  </div>
                </>
              }
            />
            {/* </Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </SocketProvider>
  );
};

export default App;
