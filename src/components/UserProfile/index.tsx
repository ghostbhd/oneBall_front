import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { userProfileData } from "../../data/mockApi";
import UserInfo from "./UserInfo";
import UserGamesHistory from "./UserGamesHistory";
import GameDetails from "./GameDetails";
import { GetHeaders } from "../../jwt_token";
import { useSocket } from "../../Socketio";
import Cookies from "js-cookie";
import * as jwtDecode from "jwt-decode";
import config from "../../config";

const UserProfile = () => {
  const [data, setData] = useState({} as any);
  const [loading, setLoading] = useState(true);

  // username from url params ------------------
  const { username } = useParams();
  const header = GetHeaders().headers;
  const history = useNavigate();
  header.append("Content-Type", "application/json");
  const [block, setBlock] = useState({
    blocker: false,
    blocked: false,
    username: "",
  });

  const socket: any = useSocket();

  useEffect(() => {

    const fetchdata = async () => {
      await fetch(config.domain + "/profileData/user", {
        method: "POST",
        headers: header,
        body: JSON.stringify({ username: username }),
      })
        .then((response) => {
          if (response.status === 404) {
            history("/UserNotFound");
            return;
          } else if (response.status === 301) {
            history("/profile");
            // console.log("same user profile");
            return;
          } else if (response.status === 401) {
            history("/Auth");
            // console.log("user not authenticated");
            return;
          } else if (!response.ok) {
            Cookies.remove("accessToken");
            history("/auth");
          }
          return response.json();
        })
        .then(async (response) => {
          if (response == undefined) return;
          setData(response);
          setBlock({
            blocker: response.blocker,
            blocked: response.blocked,
            username: username as any,
          });
          setLoading(false);
        });
    };
    fetchdata();
  }, [username]);

  const handelUnblock = () => {
    console.log("unblock clicked");
    socket.emit("UnBlock-User", {
      username1: jwtDecode.jwtDecode(Cookies.get("accessToken")).name,
      username2: data.username,
    });
    // setLoading(true);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("Unblocka", (stats) => {
      console.log("haaaaahowa tblocka ", stats);
      console.log("data", data, "stat.uaername ", stats.username);
      if (stats.username === username) {
        setBlock({
          blocker: stats.blocker,
          blocked: stats.blocked,
          username: stats.username,
        });
        console.log("the block set is ", block);
      }
    });
    socket.on("Ha-Tblocka", (stats) => {
      console.log("haaaaahowa tblocka ", stats);
      console.log("data", data, "stat.uaername ", stats.username);
      if (stats.username === username) {
        setBlock({
          blocker: stats.blocker,
          blocked: stats.blocked,
          username: stats.username,
        });
        console.log("the block set is ", block);
      }
    });
    return () => {
      socket.off("Ha-Tblocka");
      socket.off("Unblocka");
    };
  }, [socket]);

  return (
    <div
      className={`w-full md:h-full h-max flex md:flex-row flex-col 
      md:space-y-0 space-y-8 md:p-6 md:pt-16 p-4 pb-16`}
    >
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : block.blocked || block.blocker ? (
        <div className={`flex m-auto items-center justify-center`}>
          {block.blocker ? (
            <div className={`flex flex-col gap-6`}>
              <p className={`text-xl text-bLight_4`}>You blocked this user</p>
              <p
                onClick={() => handelUnblock()}
                className={`p-6 text-center bg-org_3/40 hover:bg-org_3/60 cursor-pointer transition-all 
                  text-org_2/80 rounded-2xl border-2 border-org_2/50 text-2xl font-bold`}
              >
                Unblock
              </p>
            </div>
          ) : (
            <div className={`w-4/5 flex`}>
              <p className={`text-xl text-center w-full text-bLight_4`}>
                Profile Unavailable: This user has restricted access to their
                profile. Respect their privacy and feel free to connect through
                other channels if needed.
              </p>
            </div>
          )}
        </div>
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
