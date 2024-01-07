import { ImgBg } from "../../style";
import { icons } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import config from "../../config";

const Auth = () => {

  const token = Cookies.get("accessToken");
  const history = useNavigate();
  
  useEffect(() => {
    if (token) {
      history("/");
    }
  }, [token])

  // buttons style --------------------------------------------------

  const btn = `p-2 xl:p-4 rounded-lg flex flex-row items-center 
              w-full text-sm xl:text-base cursor-pointer`;

  // buttons container responsive style -----------------------------
  const containerM = `md:ml-auto md:mr-8`;
  const containerP = `p-8`;
  const containerW = `w-full sm:w-4/6 md:w-3/12 xl:w-5/12`;
  const containerH = `h-4/6 md:h-full`;

  return (
    <div
      className={`w-screen h-screen z-50 left-0 top-0 justify-center
        sm:p-10 p-6 flex flex-col items-center`}
      style={ImgBg({ img: "/src/assets/loginPageBg.jpg" })}
    >
      {/* gradient ------------------------------ */}
      <div className="absolute w-full h-full top-0 right-0 bg-gradient-to-l from-bDark_1 to-transparent"></div>

      {/* buttons ---------------------------------------------------- */}
      <div
        className={`${containerW} ${containerH} ${containerM} ${containerP} relative flex flex-col gap-4  
          rounded-3xl shadow-login
          justify-center items-center  backdrop-blur-xl border-2 border-white border-opacity-5`}
      >
        <div
          className={`text-4xl w-full text-center my-auto font-bold text-white`}
        >
          <p>Welcome to Ping Pong game</p>
        </div>

        {/* google button ----------------------------------------------- */}
        <Link
          to={`${config.domain}/auth/login/google`}
          className={`bg-white text-black ${btn}`}
        >
          <div className={`mr-4 text-xl xl:text-3xl`}>{<icons.google />}</div>
          Login with Google
        </Link>

        {/* 42 button ----------------------------------------------- */}
        <Link
          to={`${config.domain}/auth/login/FortyTwo`}
          className={`bg-black text-white ${btn} mb-auto`}
        >
          <div className={`w-5 xl:w-7 mr-4`}>
            <img src={icons.fortyTwo} alt="42" className="" />{" "}
          </div>
          Login with 42
        </Link>
      </div>
    </div>
  );
};

export default Auth;
