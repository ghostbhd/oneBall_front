import { useNavigate } from 'react-router-dom';
const nav = (url) => {
    const history = useNavigate();
    const handleRedirect = (url) => {
      history(url);
    };
    handleRedirect(url);
  }

export function  getHeaders() {
  const headers = new Headers();
  const jwtCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='));
    if (jwtCookie) {
      const jwt = jwtCookie.split('=')[1];
      headers.append('Authorization', `Bearer ${jwt}`);
    } else {
      nav('/Auth');
    }
    return headers;
  };