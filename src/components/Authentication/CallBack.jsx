import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetHeaders } from "../../jwt_token";

const CallBack = () => {
  const history = useNavigate();
  // const Header = GetHeaders().head

  useEffect(() => {
    history("/");
  }, [history]);
  return <div></div>;
};

export default CallBack;
