import { useState, useEffect } from "react";
import { fetchDataFromMockApi } from "../../data/mockApi";
import MessageList from "./MessageList";
import ProfileDetails from "./ProfileDetails";
import GameBtn from "./GameBtn";
import GameHistory from "./GameHistory";
import { useNavigate } from 'react-router-dom';
// import jwt_decode from 'jsonwebtoken';
import * as jwtDecode from 'jwt-decode';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const row = "w-1/2 flex flex-col space-y-14";

  const  history = useNavigate ();
  const handleRedirect = (url) => {
    history(url);
  }
  useEffect(() => {
    const headers = new Headers();
    const jwtCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='));
      if (jwtCookie) {
        const jwt = jwtCookie.split('=')[1];
      const jj = jwtDecode.jwtDecode(jwt);
      console.log("the paylod is ================>", jj);
        headers.append('Authorization', `Bearer ${jwt}`)
      }
      else {
        handleRedirect('/Auth'); 
      }
      fetch('http://localhost:3009/dashboard', {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        if (response.ok) {
          return response.json();}
        })

    // fetchDataFromMockApi()
      .then((data) => {
        console.log(data); // Log the data to check its structure
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`flex flex-row w-full`}>
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <>
          <div className={`${row}`}>
            {/* messages ---------------------------------------------------------------- */}
            <MessageList last4Msgs={data.last4Msg} />
            {/* Game -------------------------------------------------------------------- */}
            <GameBtn />
          </div>
          <div className={`${row} space-y-10`}>
            {/* profile ----------------------------------------------------------------- */}
            <ProfileDetails user={data.user} />
            {/* game history ------------------------------------------------------------ */}
            <GameHistory last6Games={data.last6Games}/>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

// To Do: put message item into link
