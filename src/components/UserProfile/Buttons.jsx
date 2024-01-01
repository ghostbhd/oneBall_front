import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "../../style";
import { icons } from "../../constants";
import { useSocket } from "../../Socketio";
import { getHeaders } from "../../jwt_token";
import * as jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const Buttons = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const button = `flex sm:p-3 p-2 rounded-xl w-max items-center cursor-pointer`;
  const text = `font-bold sm:block hidden`;
  const icon = `text-xl sm:ml-2 sm:mx-0 mx-4`;

  const token = getHeaders().jwttt;
  const decoded = jwtDecode.jwtDecode(token);

  const socket = useSocket();

  const dataSetten = (state) => {
    setData((prevData) => ({
      ...prevData,
      friend: state.friend,
      friendRequest: state.friendRequest,
      friendRequestSent: state.friendRequestSent,
    }));
  };

  const addFriend = () => {
    console.log(
      "add friend Clicked ",
      decoded,
      "the username is ",
      data.username
    );
    socket.emit("FriendRequest", {
      username1: decoded.name,
      username2: data.username,
    });
    setData((prevData) => ({
      ...prevData,
      friend: false,
      friendRequest: false,
      friendRequestSent: true,
    }));
  };

  const RefuseFriend = () => {
    console.log(
      "Refuse friend Clicked ",
      decoded,
      "the username is ",
      data.username
    );
    socket.emit("RefuseRequest", {
      username1: decoded.name,
      username2: data.username,
    });
    setData((prevData) => ({
      ...prevData,
      friend: false,
      friendRequest: false,
      friendRequestSent: false,
    }));
    // window.location.reload();
  };

  const AcceptFriend = () => {
    console.log(
      "Accept friend Clicked ",
      decoded,
      "the username is ",
      data.username
    );
    socket.emit("AcceptRequest", {
      username1: decoded.name,
      username2: data.username,
    });
    setData((prevData) => ({
      ...prevData,
      friend: true,
      friendRequest: false,
      friendRequestSent: false,
    }));
  };

  useEffect(() => {
    socket.emit("userState", {
      username1: decoded.name,
      username2: data.username,
    });
    socket.on("FriendRequest", (stats) => {
      // Update the component state
      dataSetten(stats);
    });

    // socket.on("RefuseRequest", (stats) => {
    //   dataSetten(stats);
    // });

    // socket.on("AcceptRequest", (stats) => {
    //   dataSetten(stats);
    // });
    // Clean up the socket subscription on component unmount
    return () => {
      socket.off("FriendRequest");
    };
  }, []);

  return (
    <div
      className={`w-full flex flex-col space-y-6 sm:px-5 px-3 ${style.blueBlur} p-4 ${style.rounded}`}
    >
      {/* challenge button ----------------------------------------- */}
      <Link
        to={"/games"}
        className={`w-full flex flex-row justify-center items-center sm:p-3 p-2
              rounded-xl bg-bLight_1`}
      >
        <p className={` ml-auto text-bDark_3 font-bold`}>Challenge</p>
        <div className={`sm:text-3xl text-2xl text-bDark_3 ml-auto`}>
          {<icons.gameController />}
        </div>
      </Link>

      <div
        className={`flex flex-row text-sm w-full sm:!mt-auto justify-between`}
      >
        {!data.friend && !data.friendRequest && !data.friendRequestSent ? (
          // Add friend button ------------------------------------------------------------
          <div
            className={`${button} bg-bDark_4 text-bLight_3`}
            onClick={addFriend}
          >
            <p className={`${text} `}>Add Friend</p>
            <div className={`${icon} `}>{<icons.addPerson />}</div>
          </div>
        ) : data.friend ? (
          // Remove friend button -----------------------------------------------------------
          <div
            className={`${button} bg-bLight_4 text-bDark_3`}
            onClick={RefuseFriend}
          >
            <p className={`${text} `}>Remove Friend</p>
            <div className={`${icon}`}>{<icons.removePerson />}</div>
          </div>
        ) : data.friendRequest ? (
          // Accept friend request button ---------------------------------------------------
          <div className={`flex flex-row space-x-4`}>
            <div
              className={`${button} bg-bDark_4 text-bLight_3`}
              onClick={AcceptFriend}
            >
              <p className={`${text} `}>Accept</p>
              <div className={`${icon} !text-base`}>{<icons.check />}</div>
            </div>
            <div
              className={`${button} bg-bLight_4 text-bDark_3`}
              onClick={RefuseFriend}
            >
              <p className={`${text} `}>Decline</p>
              <div className={`${icon} !text-base`}>{<icons.xmark />}</div>
            </div>
          </div>
        ) : data.friendRequestSent ? (
          // Cancel friend request button ---------------------------------------------------
          <div
            className={`${button} bg-bLight_4 text-bDark_3`}
            onClick={RefuseFriend}
          >
            <p className={`${text} `}>Cancel Request</p>
            <div className={`${icon}`}>{<icons.cancelRequest />}</div>
          </div>
        ) : (
          <div></div>
        )}

        {/* send message button --------------------------- */}
        <div className={`${button} bg-bLight_3 text-bDark_4`}>
          <p className={`${text}`}>Send Message</p>
          <div className={`${icon}`}>{<icons.sendMessage />}</div>
        </div>

        {/* block button --------------------------- */}
        <div className={`${button} bg-bDark_3 text-org_3/70`}>
          <p className={`${text}`}>Block</p>
          <div className={`${icon}`}>{<icons.block />}</div>
        </div>
      </div>
    </div>
  );
};

Buttons.propTypes = {
  data: PropTypes.object,
};

export default Buttons;
