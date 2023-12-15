import GoogleAuthButton from "./googleAuth"
import FortyTwoAuthButton from "./FortyTwoAuth"

const Auth = () => {
return (
    <div className={`absolute w-screen h-screen bg-white z-50 left-0 top-0 p-10 flex flex-col items-center`}>
      <div className={`p-2 bg-black text-white rounded-full`}>
        <GoogleAuthButton/>
      </div>
      <div>
        <FortyTwoAuthButton/>
      </div>
     </div>
    );
};

export default Auth;
