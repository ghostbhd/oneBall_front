import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userProfileData } from "../../data/mockApi";
import UserInfo from "./UserInfo";
import UserGamesHistory from "./UserGamesHistory";
import GameDetails from "./GameDetails";
import { getHeaders } from "../../jwt_token";

const UserProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // username from url params ------------------
  const { username } = useParams();
  const header = getHeaders().headers;
  header.append('Content-Type', 'application/json')

  useEffect(() => {
    // fetch(`http://localhost:3000/api/profile/${username}`) // Fetch the data from the API
    const fetchdata = async () => {
      const response = await fetch("http://localhost:3009/profileData/user", {
        method: "POST",
        headers: header,
        body: JSON.stringify({ username: username }),
      });
      // .then((res) => {
      //   if (res.ok) {
      //     res.json();
      //   }
      // })

      if (response.status === 404)
      {
        console.log("User not found");
        return;         
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchdata();
  }, []);

  return (
    <div
      className={`w-full md:h-full h-max flex md:flex-row flex-col 
      md:space-y-0 space-y-8 md:p-6 md:pt-16 p-4 pb-16`}
    >
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <>
          {/* User details row --------------------------*/}
          <div className="flex flex-col md:w-8/12 w-full sm:h-full space-y-6">
            {/* user Infr ----- */}
            <UserInfo data={data} />
            {/* user game details ----- */}
            <GameDetails data={data} />
          </div>

          {/* User game history ------------------------------*/}
          <div
            className={`flex flex-col md:w-[30%] w-full md:h-full h-96 ml-auto`}
          >
            <UserGamesHistory gamehistory={data.gamesHistory} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
