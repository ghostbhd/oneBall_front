import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallBack = () => {
  useEffect (() => {
      const jwtCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='));
        console.log('JWT:', document.cookie);
      if (jwtCookie) {
        const jwt = jwtCookie.split('=')[1];
        console.log('JWT:', jwt);
    }
  })
  const history = useNavigate ();
  // const response =  fetch("http://localhost:3009/Auth/google/callback");
  // console.log(response);
  console.log("heeeeeeeeeeeellllllllllloooooooooooooooooooo")
  const handleRedirect = () => {
  history('/profile');
  };
   useEffect(() => {
    // Call handleRedirect when the component mounts
    handleRedirect();
  }, []);
  return (
    <div>
      <p>This is my component</p>
    </div>
  );
};

export default CallBack ;
