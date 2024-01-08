import React from "react";
import style from "../../style";

const InviteFriend = ({
  friendList,
  setShowInviteFriend,
  showInviteFriend,
  setShowSelectFriend,
  showSelectFriend,
  setSelectedFriend,
  selectedFriend,
}: any) => {


  // handel invite friend -----------------------------------------
  const handelInviteFriend = () => {
    console.log(selectedFriend);
    // send invite to server --------------------------------------
    // ...
    // close modal -----------------------------------------------
    setShowInviteFriend(false);
    setShowSelectFriend(false);
    setSelectedFriend("");
  };

  return (
    <div className="fixed flex w-full h-full top-0 left-0 z-10 bg-bDark_5/70 backdrop-blur-2xl">
      {/* on click set the badge false -------------------------- */}
      <div
        className={`absolute w-full h-full left-0 top-0`}
        onClick={() => {
          setShowInviteFriend(false);
          setShowSelectFriend(false);
        }}
      ></div>
      {/* modal ----------------------------------------------- */}
      <div
        className={`${style.blueBlur} ${style.rounded} flex flex-col gap-4 w-72 p-4 h-max m-auto`}
      >
        {/* invite friend text ------ */}
        <p className={`text-bLight_4`}>Select friend to invite</p>
        {/* select friend ------ */}
        <div className="w-full flex h-max relative">
          <div
            className={`w-full cursor-pointer p-2 outline-none rounded-full bg-bDark_4 border-2 border-bLight_5/50 text-bLight_5`}
            onClick={() => setShowSelectFriend(!showSelectFriend)}
          >
            {selectedFriend.username}
          </div>
          {/* friend list --------------------------- */}
          {showSelectFriend && (
            <div className="absolute flex top-full h-48 left-0 w-full overflow-hidden rounded-3xl">
              <div className="flex flex-col w-full h-full overflow-y-auto text-bLight_4 bg-bDark_4 rounded-3xl">
                {friendList.map((friend : any) => (
                  <div
                    key={friend.username}
                    className={`p-2 cursor-pointer hover:bg-bLight_5/20 transition-all duration-300`}
                    onClick={() => {
                      setSelectedFriend(friend);
                      setShowSelectFriend(false);
                    }}
                  >
                    @{friend.username}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* invite button ------ */}
        <div
          className={`w-full cursor-pointer p-2 rounded-full bg-org_3/40 border-2 
              border-org_3/50 text-org_1/80 text-center transition-all duration-300 hover:bg-org_3/60`}
          onClick={() => handelInviteFriend()}
        >
          Invite
        </div>
      </div>
    </div>
  );
};

export default InviteFriend;
