import { useNavigate } from "react-router-dom";

export const getHeaders = () => {
  const history = useNavigate();
  const handleRedirect = (url) => {
    history(url);
  };
  const headers = new Headers();
  var jwttt;

  const jwtCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));
  jwttt = jwtCookie;
  if (jwtCookie) {
    const jwt = jwtCookie.split("=")[1];
    headers.append("Authorization", `Bearer ${jwt}`);
  } else {
    handleRedirect("/Auth");
  }

  return { headers, jwttt };
};
