import { useState, useEffect } from "react";
import { fetchDataFromMockApi } from "../../data/mockApi";
import MessageList from "./MessageList";
import ProfileDetails from "./ProfileDetails";
import GameBtn from "./GameBtn";
import GameHistory from "./GameHistory";
// import { headers } from "../../jwt_token";
import  { getHeaders } from "../../jwt_token";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const row = "w-1/2 flex flex-col space-y-14";
  
  useEffect(() => {
    // fetch("/api/dashboard")
    
    // fetchDataFromMockApi()
    const headers = getHeaders();
   
    fetch('http://localhost:3009/dashboard', {
      method: 'GET',
      headers: headers,
    })
    .then(response => {
      if (response.ok) {
        return response.json();}
      })
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
