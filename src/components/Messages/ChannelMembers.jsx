import PropTypes from "prop-types";
import style, { ImgBg } from "../../style";
import { chatIcons } from "../../constants";

const ChannelMembers = ({ show, setShow }) => {
  const members = [
    {
      id: "1",
      username: "firstone",
      avatar: "https://i.pravatar.cc/150?img=1",
      mute: false,
      ban: false,
    },
    {
      id: "2",
      username: "user2",
      avatar: "https://i.pravatar.cc/150?img=2",
      mute: true,
      ban: false,
    },
    {
      id: "3",
      username: "user3",
      avatar: "https://i.pravatar.cc/150?img=3",
      mute: false,
      ban: true,
    },
    {
      id: "1",
      username: "user1",
      avatar: "https://i.pravatar.cc/150?img=1",
      mute: false,
      ban: false,
    },
    {
      id: "2",
      username: "user2",
      avatar: "https://i.pravatar.cc/150?img=2",
      mute: true,
      ban: false,
    },
    {
      id: "3",
      username: "user3",
      avatar: "https://i.pravatar.cc/150?img=3",
      mute: false,
      ban: true,
    },
    {
      id: "1",
      username: "user1",
      avatar: "https://i.pravatar.cc/150?img=1",
      mute: false,
      ban: false,
    },
    {
      id: "2",
      username: "user2",
      avatar: "https://i.pravatar.cc/150?img=2",
      mute: true,
      ban: false,
    },
    {
      id: "3",
      username: "user3",
      avatar: "https://i.pravatar.cc/150?img=3",
      mute: false,
      ban: true,
    },
    {
      id: "2",
      username: "user2",
      avatar: "https://i.pravatar.cc/150?img=2",
      mute: true,
      ban: false,
    },
    {
      id: "3",
      username: "user3",
      avatar: "https://i.pravatar.cc/150?img=3",
      mute: false,
      ban: true,
    },
    {
      id: "2",
      username: "user2",
      avatar: "https://i.pravatar.cc/150?img=2",
      mute: true,
      ban: false,
    },
    {
      id: "3",
      username: "user3",
      avatar: "https://i.pravatar.cc/150?img=3",
      mute: false,
      ban: true,
    },
    {
      id: "2",
      username: "user2",
      avatar: "https://i.pravatar.cc/150?img=2",
      mute: true,
      ban: false,
    },
    {
      id: "3",
      username: "lastone",
      avatar: "https://i.pravatar.cc/150?img=3",
      mute: false,
      ban: true,
    },
  ];

  // member button style -------------------------------------------------
  const buttonStyle = `text-xl text-bLight_5 hover:text-bLight_2 cursor-pointer`;

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
                        onClick={() => console.log("unmute")} // handel click ***
                      />
                    ) : (
                      <chatIcons.unmute
                        className={`${buttonStyle}`}
                        onClick={() => console.log("mute")}
                      />
                    )}
                  </div>
                  {/* ban - unban ----*/}
                  <div>
                    {member.ban ? (
                      <chatIcons.ban
                        className={`${buttonStyle}`}
                        onClick={() => console.log("unban")}
                      />
                    ) : (
                      <chatIcons.unban
                        className={`${buttonStyle}`}
                        onClick={() => console.log("ban")}
                      />
                    )}
                  </div>
                  {/* kick ---*/}
                  <div>
                    <chatIcons.kick
                      className={`${buttonStyle}`}
                      onClick={() => console.log("kick")}
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
