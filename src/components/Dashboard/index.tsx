import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import ProfileDetails from "./ProfileDetails";
import GameBtn from "./GameBtn";
import GameHistory from "./GameHistory";
import { GetHeaders } from "../../jwt_token";
import config from "../../config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  const row = "sm:w-1/2 w-full sm:flex hidden flex-col space-y-20";

  // Headers for fetch ----------------
  const headers = GetHeaders().headers;

  useEffect(() => {
    const fetchData = async () => {
      await fetch(config.domain + "/dashboard", {
        method: "GET",
        headers: headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }else {
            throw new Error();
          }
        })
        .then((data) => {
          console.log(data); // Log the data to check its structure
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching data", err);
          Cookies.remove("accessToken");
          history("/auth");
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  return (
    <div
      className={`flex sm:flex-row flex-col w-full md:p-6 md:pt-14 pb-28 p-2  md:px-10 sm:px-6`}
    >
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
          <div className={`${row}`}>
            {/* profile ----------------------------------------------------------------- */}
            <ProfileDetails user={data.user} />
            {/* game history ------------------------------------------------------------ */}
            <GameHistory last6Games={data.last6Games} />
          </div>

          {/* In Mobile order ------------------------------------------------------------------ */}
          <div className="flex sm:hidden flex-col space-y-14">
            {/* Profile ------------------------------------------------ */}
            <ProfileDetails user={data.user} />
            {/* Game --------------------------------------------------- */}
            <GameBtn />
            {/* Messages ----------------------------------------------- */}
            <MessageList last4Msgs={data.last4Msg} />
            {/* Game history ------------------------------------------- */}
            <GameHistory last6Games={data.last6Games} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

// To Do: put message item into link
