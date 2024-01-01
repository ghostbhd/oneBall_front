import PropTypes from "prop-types";
import style, { ImgBg } from "../../../style";
import { chatIcons } from "../../../constants";
import { useState, useEffect } from "react";
import { useSocket } from "../../../Socketio.jsx";

const ChannelMembers = ({ show, setShow, activeChannel, currentUserToken }) => {
  const [members, setMembers] = useState([]);
  const socket = useSocket();
  // member button style -------------------------------------------------
  const buttonStyle = `text-xl text-bLight_5 hover:text-bLight_2 cursor-pointer`;

  // console.log(members);
  useEffect(() => {
    socket.on("channelMembers", (data) => {
      console.log("memers are:", data);
      setMembers(data);
    });

    // socket.on("newMember", )


    // socket.on("userKickedFromChannel");

    //  socket.on("userKickedFromChannel")
    return () => {
      socket.off("channelMembers");
    };
  }, []);

  const handelKickUser = (requesterId) => {
    socket.emit(
      "kickUserFromChannel",
      activeChannel,
      currentUserToken.id,
      requesterId
    );
  };

  const handleAddPassword = () => {};

  const handleRemovePassword = () => {};

  const handelChangePassword = () => {};

  const handelMute = () => {};

  const handelUnMute = (requesterId) => {
    // console.log(" Unmuting user");
    // socket.emit("UnMuteUser",activeChannel,requesterId);
  };

  const handelBane = () => {};

  const handelUnBane = () => {};

  return (
    <div
      className={`fixed flex top-0 left-0 w-full h-full z-10 bg-bDark_5/70 p-4 ${
        show ? "" : "hidden"
      }`}
    >
      {/* absolute class on click setShow to false ------- */}
      <div
        className={`absolute top-0 left-0 w-full h-full backdrop-blur-lg`}
        onClick={() => setShow(false)}
      ></div>

      {/* members ------------------------------------------ */}
      <div
        className={`w-6/12 flex flex-col overflow-hidden h-full m-auto border-2 z-20 p-2
          border-bLight_5/20 bg-bDark_4/80 ${style.rounded}`}
      >
        {/* Header ------------------------------------------------------*/}
        <div className={`w-full h-max flex p-2 pl-4 text-bLight_4`}>
          <p>Members</p>
        </div>
        {/* body ------------------------------------------------------*/}
        <div
          className={`h-full flex w-full overflow-hidden border-2 border-bLight_5/40 rounded-3xl`}
        >
          <div className={`w-full h-full flex flex-col overflow-y-auto`}>
            {members.map((member) => (
              // Member item ----------------------------------------------
              <div
                key={member.id}
                className={`flex p-2 w-full hover:bg-bDark_1/20 transition-all`}
              >
                <div className={`flex items-center`}>
                  {/* Image -------------------------- */}
                  <div
                    style={ImgBg({ img: member.avatar })}
                    className={`w-12 h-12 rounded-full`}
                  ></div>
                  {/* username --------------------------- */}
                  <p className={`text-bLight_4 text-sm px-2`}>
                    @{member.username}
                  </p>
                </div>
                {/* buttons ------------------------------------------------------------------------------------ */}
                <div className={`ml-auto flex items-center gap-2`}>
                  {/* mute - unmute ----*/}
                  <div className={`${buttonStyle}`}>
                    {member.mute ? (
                      <chatIcons.mute
                        className={`${buttonStyle}`}
                        onClick={() => handelUnMute(member.userid.id)} // handel click ***
                      />
                    ) : (
                      <chatIcons.unmute
                        className={`${buttonStyle}`}
                        onClick={() => handelMute(member.userid.id)}
                      />
                    )}
                  </div>
                  {/* ban - unban ----*/}
                  <div>
                    {member.ban ? (
                      <chatIcons.ban
                        className={`${buttonStyle}`}
                        onClick={() => handelUnBane(member.userid.id)}
                      />
                    ) : (
                      <chatIcons.unban
                        className={`${buttonStyle}`}
                        onClick={() => handelBane(member.userid.id)}
                      />
                    )}
                  </div>
                  {/* kick ---*/}
                  <div>
                    <chatIcons.kick
                      className={`${buttonStyle}`}
                      onClick={() => handelKickUser(member.userid.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ChannelMembers.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default ChannelMembers;
