// import { profileData } from "../../data/mockApi";
import { useEffect, useState } from "react";
import style from "../../style";
import EditInfo from "./EditInfo";
import Details from "./Details";
import MDetails from "./MDetails";
import FriendRequests from "./FriendRequests";
import { GetHeaders } from "../../jwt_token";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { useSocket } from "../../Socketio";
import * as jwtDecode from "jwt-decode";

const Profile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  const history = useNavigate();
  const handleRedirect = (url) => {
    history(url);
  };
  const headers = GetHeaders().headers;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(config.domain + "/profileData", {
        method: "GET",
        headers: headers,
      });
      if (response.status === 401) {
        handleRedirect("/Auth");
        console.log("Unauthorized. Please log in.");
        return;
      }
      const data = await response.json();
      console.log("Index profile data:", data);
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [loading]);

  const token = GetHeaders().jwttt;
  let decoded;
  if (token) decoded = jwtDecode.jwtDecode(token);
  else decoded = null
  useEffect(() => {
    if (socket == null) return;
    socket.emit("FriendList", decoded.id);
    console.log("the user id is ", decoded.id);
  }, [loading]);

  return (
    <div
      className={`w-full sm:h-full sm:space-x-8 xl:space-x-10 flex sm:flex-row flex-col md:pb-4 pb-16 p-4 md:px-10 sm:pt-14 pt-6`}
    >
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <>
          {/* Mobile details ------------------------- */}
          <div className={`block sm:hidden mb-8 w-full h-max ${style.rounded}`}>
            <MDetails data={data.profileInfo} />
          </div>

          {/* Edit info and friend requests ------------------- */}
          <div
            className={`sm:w-8/12 w-full sm:h-full relative overflow-y-auto h-max ${style.blueBlur} ${style.rounded}`}
          >
            <EditInfo data={data.editInnfo} setData={setData} loading={loading} setLoading={setLoading} />

            {/* Friend requests ------------------------- */}
            <FriendRequests />
          </div>

          {/* Details -------------------------------------- */}
          <div
            className={`sm:w-4/12 w-full sm:h-full bg-gradient-to-b from-org_1/40 from-5% shadow-4xl
            via-bDark_1/50 to-bLight_5/20 ml-auto ${style.rounded} backdrop-blur-xl`}
          >
            <Details data={data.profileInfo} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
