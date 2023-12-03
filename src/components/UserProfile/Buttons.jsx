import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "../../style";
import { icons } from "../../constants";

const Buttons = ({ data }) => {
  const button = `flex p-3 rounded-xl w-max items-center cursor-pointer`;
  const text = `font-bold`;
  const icon = `text-xl ml-2`;

  return (
    <div
      className={`w-full flex flex-col px-5 bg-bLight_2/30 p-4 ${style.rounded}`}
    >
      {/* start game button ----------------------------------------- */}
      <Link
        to={"/game"}
        className={`w-full flex flex-row justify-center items-center p-3 
              rounded-xl bg-bLight_1`}
      >
        <p className={` ml-auto text-bDark_3 font-bold`}>Challenge</p>
        <div className={`text-3xl text-bDark_3 ml-auto`}>
          {<icons.gameController />}
        </div>
      </Link>

      <div className={`flex flex-row text-sm w-full mt-auto justify-between`}>
        {!data.friend && !data.friendRequest && !data.friendRequestSent ? (
          // Add friend button ---------------------------
          <div className={`${button} bg-bDark_4 text-bLight_3`}>
            <p className={`${text} `}>Add Friend</p>
            <div className={`${icon} `}>{<icons.addPerson />}</div>
          </div>
        ) : data.friend ? (
          // Remove friend button ---------------------------
          <div className={`${button} bg-bLight_4 text-bDark_3`}>
            <p className={`${text} `}>Remove Friend</p>
            <div className={`${icon}`}>{<icons.removePerson />}</div>
          </div>
        ) : data.friendRequest ? (
          // Accept friend request button ---------------------------
          <div className={`flex flex-row space-x-4`}>
            <div className={`${button} bg-bDark_4 text-bLight_3`}>
              <p className={`${text} `}>Accept</p>
            </div>
            <div className={`${button} bg-bLight_4 text-bDark_3`}>
              <p className={`${text} `}>Decline</p>
            </div>
          </div>
        ) : data.friendRequestSent ? (
          // Cancel friend request button ---------------------------
          <div className={`${button} bg-bLight_4 text-bDark_3`}>
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
  data: PropTypes.object.isRequired,
};

export default Buttons;
