import GoogleAuthButton from "./googleAuth"
import FortyTwoAuthButton from "./FortyTwoAuth"

const Auth = () => {
return (
    <div>
      <div>
        <GoogleAuthButton/>
      </div>
      <div>
        <FortyTwoAuthButton/>
      </div>
     </div>
    );
};

export default Auth;
