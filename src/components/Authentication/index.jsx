import GoogleAuthButton from "./googleAuth";
import FortyTwoAuthButton from "./FortyTwoAuth";
import { ImgBg } from "../../style";
import { icons } from "../../constants";

const Auth = () => {

  const btn = `p-2 rounded-lg flex flex-row items-center w-72 text-sm`;

  return (
    <div
      className={`absolute w-screen h-screen z-50 left-0 top-0 
        p-10 flex items-center`}
      style={ImgBg({ img: "/src/assets/loginPageBg.jpg" })}
    >
      {/* gradient ------------------------------ */}
      <div className="absolute w-full h-full top-0 right-0 bg-gradient-to-l from-bDark_1 to-transparent"></div>

      {/* buttons ---------------------------------------------------- */}
      <div
        className={`ml-auto relative flex flex-col gap-4 mr-8 h-full w-max rounded-3xl shadow-login
          justify-center items-center p-8 backdrop-blur-xl border-2 border-white border-opacity-5`}
      >
        <div className={`text-4xl w-72 text-center my-auto font-bold text-white`}>
          <p>Welcome to Ping Pong game</p>
        </div>
        {/* google button ----------------------------------------------- */}
        <div
          className={`bg-white text-black ${btn}`}
        >
          <div className={`mr-4 text-xl`}>{<icons.google />}</div>
          <GoogleAuthButton />
        </div>

        {/* 42 button ----------------------------------------------- */}
        <div
          className={`bg-black text-white ${btn} mb-auto`}
        >
          <div className={`w-5 mr-4`}>
            <img src={icons.fortyTwo} alt="42" className="" />{" "}
          </div>
          <FortyTwoAuthButton />
        </div>
      </div>
    </div>
  );
};

export default Auth;
