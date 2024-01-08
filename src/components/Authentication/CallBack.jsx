import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallBack = () => {
  const history = useNavigate();

  useEffect(() => {
    history("/");
  }, [history]);

  return <div></div>;
};

export default CallBack;
