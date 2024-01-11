import React, { useState } from "react";

import { useSocket } from "../../../Socketio";

const ChannelCreation = ({ onClose, currentUserToken }) => {
  const [channelName, setChannelName] = useState("");
  const [inputError, setInputError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [channelType, setChannelType] = useState("public");
  const [password, setPassword] = useState("");

  const socket: any = useSocket();

  const handleSubmit = async () => {
    const regex = /[A-Z !@#$%^&*(),.?":{}|<>]/;

    if (
      channelName.length < 3 ||
      channelName.length > 15 ||
      regex.test(channelName)
    ) {
      setInputError(
        "Channel name must be 3-15 characters long and contain only letters and numbers"
      );
      setChannelName("");
      return;
    }

    if (channelType === "protected" && password.length < 3) {
      setPasswordError("Password must be at least 3 characters long");
      setPassword("");
      return;
    }

    // try {
    const channelData = {
      ownerId: parseInt(currentUserToken.id),
      channelName,
      channelType,
      password: channelType === "protected" ? password : undefined,
    };

    socket.emit("createChannel", channelData);
    onClose();
    // } catch (error) {
    // console.error("Failed to create channel:", error);
    // }
  };

  return (
    <div className="fixed inset-0 flex items-center  justify-center drop-shadow-lg">
      <div
        className="absolute w-full h-full top-0 left-0 bg-bDark_5/70"
        onClick={onClose}
      ></div>

      <div className="bg-bDark_3 flex flex-col items-center rounded-3xl gap-6 w-96 p-5 z-10">
        <p className="text-bLight_5 text-lg mb-5">Create Channel</p>

        {/* channel name -------------------------------------------------------------------- */}
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel Name"
            className="w-full p-2 outline-none border-2 text-sm placeholder:text-bLight_5 text-bLight_4 border-bLight_5/40 bg-bDark_4 rounded-full"
          />
          <p className="text-org_1/60 text-xs px-2">{inputError}</p>
        </div>

        {/* channel type -------------------------------------------------------------------- */}
        <div className="flex flex-col w-full px-2 items-center gap-4 py-3  text-bLight_5">
          <div className="w-full flex justify-between items-center">
            <div
              className={`flex items-center cursor-pointer ${
                channelType === "public" &&
                "bg-bLight_5/40 text-bLight_3/70 p-2 rounded-full"
              }`}
              onClick={() => setChannelType("public")}
            >
              Public
            </div>

            <div
              className={`flex items-center cursor-pointer ${
                channelType === "private" &&
                "bg-bLight_5/40 text-bLight_3/70 p-2 rounded-full"
              }`}
              onClick={() => setChannelType("private")}
            >
              Private
            </div>
            <div
              className={`flex items-center cursor-pointer ${
                channelType === "protected" &&
                "bg-bLight_5/40 text-bLight_3/70 p-2 rounded-full"
              }`}
              onClick={() => setChannelType("protected")}
            >
              Protected
            </div>
          </div>

          {/* password -------------------------------------------------------------------- */}
          {channelType === "protected" && (
            <div className="w-full">
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 outline-none border-2 text-sm placeholder:text-bLight_5 
              text-bLight_4 border-bLight_5/40 bg-bDark_4 rounded-full"
            />
            <p className="text-org_1/60 text-xs px-2">{passwordError}</p>
            </div>
          )}
        </div>

        {/* buttons -------------------------------------------------------------------- */}
        <div className="flex w-full gap-4 items-center">
          <button onClick={onClose} className="text-org_1/70 ml-auto">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 ms-8 rounded-full bg-org_3/60 text-org_1/80 hover:bg-org_3/70 transition-all"
          >
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelCreation;
