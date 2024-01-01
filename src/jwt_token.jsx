import { useNavigate } from "react-router-dom";

export const GetHeaders = () => {
  const history = useNavigate();

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
    jwttt = undefined;
    history("/Auth");
  }

  return { headers, jwttt };
};
