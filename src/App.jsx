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
          {/* backdrop ----------------------------------------------------------------- */}
          <div
            className={`absolute right-0 top-0 w-screen h-screen bg-bDark_5/60 ${style.backdropBlur}`}
          ></div>
          {/* Authentication ---------------------------------------------------------- */}
          <Routes>
            <Route path="/Auth" element={<Auth />} />
            <Route path="/Callback" element={<CallBack />} />

            <Route
              path="*"
              element={
                <>
                  {/* sidebar ----------------------------------------------------------------- */}
                  <SideBar />
                  {/* mobile sidebar ---------------------------------------------------------- */}
                  <MSideBar />

                  {/* content ----------------------------------------------------------------- */}
                  <div
                    className={`flex flex-wrap relative overflow-y-auto xl:px-50 pt-6
                      ${
                        theme.isSidebarCollapsed
                          ? style.contentW2
                          : style.contentW
                      }
                      `}
                  >
                    {/* navbar ----------------------------------------------------------------- */}
                    <NavBar />
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
                      {/* if the component state of /profile/:username route be 404 */}

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
