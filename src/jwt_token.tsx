import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GetHeaders: React.FC = () => {
  const history = useNavigate();
  const headers = new Headers();

  const jwttt = Cookies.get("accessToken");
  if (jwttt) {
    headers.append("Authorization", `Bearer ${jwttt}`);
  }

  useEffect(() => {
    if (!jwttt) {
      history("/Auth");
    }
  }, [jwttt, history]);

  return { headers, jwttt };
};
