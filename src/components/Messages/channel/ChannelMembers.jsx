import PropTypes from "prop-types";
import style, { ImgBg } from "../../../style";
import { chatIcons, icons } from "../../../constants";
import { useState, useEffect } from "react";
import { useSocket } from "../../../Socketio.jsx";
import { Link } from "react-router-dom";

const ChannelMembers = ({ show, setShow, activeChannel, currentUserToken, membershipStatus }) => {
  const [members, setMembers] = useState([]);
  const socket = useSocket();

  // member button style -------------------------------------------------
  const buttonStyle = `text-xl text-bLight_5 hover:text-bLight_2 cursor-pointer`;

  useEffect(() => {
    // channel members -----------------------
    socket.on("channelMembers", (data) => {
      console.log("dattaaa:",data);
      setMembers(data);
    });

    console.log("Token is ", currentUserToken);

    return () => {
      socket.off("channelMembers");
    };
  }, []);

  const handelKickUser = (requesterId) => {
    socket.emit("kickUserFromChannel", {
      channelId: activeChannel,
      userId: currentUserToken.id,
      requesterId: requesterId,
    });
  };

  // set admin ----------------------------------
  const handelSetAdmin = (channelId, seter, userSetted) => {
    console.log("setting user as admin", channelId, seter, userSetted);
    socket.emit("setUserAsAdmin", {
      channelId: channelId,
      userId: seter,
      requesterId: userSetted,
    });
  };

  // remove admin ----------------------------------
  const handelRemoveAdmin = (channelId, seter, userSetted) => {
    console.log("setting user as admin", channelId, seter, userSetted);
    socket.emit("removeUserFromAdmin", {
      channelId: channelId,
      userId: seter,
      requesterId: userSetted,
    });
  };

  const handelMute = (requesterId) => {
    console.log(" MuteUser", currentUserToken.id, requesterId);
    socket.emit("MuteUser", {
      channelId: activeChannel,
      userId: currentUserToken.id,
      targetUserId: requesterId,
    });
  };

  const handelUnMute = (requesterId) => {
    console.log(" Unmuting user", currentUserToken.id, requesterId);

    socket.emit("UnMuteUser", {
      channelId: activeChannel,
      userId: currentUserToken.id,
      targetUserId: requesterId,
    });
  };

  const handelBane = (requesterId) => {
    console.log(" BanUser", currentUserToken.id, requesterId);
    socket.emit("BanUser", {
      channelId: activeChannel,
      userId: currentUserToken.id,
      targetUserId: requesterId,
    });
  };

  const handelUnBane = (requesterId) => {
    console.log(" UnBanUser", currentUserToken.id, requesterId);
    socket.emit("UnBanUser", {
      channelId: activeChannel,
      userId: currentUserToken.id,
      targetUserId: requesterId,
    });
  };

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
                <div className={`flex gap-2 items-center`}>
                  {/* Image -------------------------- */}
                  <Link
                    to={`/profile/${member.username}`}
                    style={ImgBg({ img: member.avatar })}
                    className={`w-12 h-12 rounded-full`}
                  ></Link>
                  <div className={`flex flex-col w-max`}>
                    {/* username --------------------------- */}
                    <p className={`text-bLight_4 py-1 text-sm`}>
                      @{member.username}
                    </p>
                    {membershipStatus.isOwner ? 
                    <>
                    {/* role --------------------------- */}
                    {member.isMember ? (
                      <div className={`flex items-center gap-2`}>
                        <p className={`text-bLight_5 text-xs`}>Member</p>

                        {/* set as admin button -------- */}
                        <button
                          className={`text-xs p-1 bg-bLight_5 rounded-full text-bDark_4 transition-all hover:bg-bLight_4`}
                          onClick={() =>
                            handelSetAdmin(
                              activeChannel,
                              currentUserToken.id,
                              member.userid.id
                            )
                          }
                        >
                          Set as admin
                        </button>
                      </div>
                    ) : (
                      <div className={`flex items-center gap-2`}>
                        <p className={`text-org_3 text-xs`}>Admin</p>

                        {/* remove admin button -------- */}
                        <button
                          title="Remove admin"
                          className={`text-xs p-1 bg-bLight_5 rounded-full text-bDark_4 transition-all hover:bg-bLight_4`}
                          onClick={() =>
                            handelRemoveAdmin(
                              activeChannel,
                              currentUserToken.id,
                              member.userid.id
                            )
                          }
                        >
                          {<chatIcons.admin />}
                        </button>
                      </div>
                    )}
                    </>
                    :
                    null}
                  </div>
                </div>
                {/* buttons ------------------------------------------------------------------------------------ */}
                <div className={`ml-auto flex items-center gap-2`}>
                  {currentUserToken.name === member.username ? (
                    <div onClick={() => handelKickUser(member.userid.id)} className={`text-sm text-bDark_4 bg-bLight_4 p-1 cursor-pointer rounded-full`}>
                      Leave channel
                    </div>
                  ) : (
                    <>
                    {/* mute - unmute ----*/}
                  <div className={`${buttonStyle}`}>
                    {member.isMuted ? (
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
                    {member.isBanned ? (
                      <chatIcons.unban
                        className={`${buttonStyle}`}
                        onClick={() => handelUnBane(member.userid.id)}
                      />
                    ) : (
                      <chatIcons.ban
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
                  </div></>)}
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
  activeChannel: PropTypes.number.isRequired,
  currentUserToken: PropTypes.object.isRequired,
};

export default ChannelMembers;
