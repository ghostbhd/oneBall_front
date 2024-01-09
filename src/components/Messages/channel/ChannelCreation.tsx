import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';

import { useSocket } from "../../../Socketio";

const ChannelCreation = ({ onClose, currentUserToken }) => {
  const [channelName, setChannelName] = useState("");

  const [channelType, setChannelType] = useState("public");
  const [password, setPassword] = useState("");

  const socket: any = useSocket();

  const handleSubmit = async () => {
    try {
      const channelData = {
        ownerId: parseInt(currentUserToken.id),
        channelName,
        channelType,
        password: channelType === "protected" ? password : undefined,
      };

      socket.emit("createChannel", channelData);
      onClose();
    } catch (error) {
      console.error("Failed to create channel:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center  justify-center drop-shadow-lg">
      <div
        className="absolute w-full h-full top-0 left-0 bg-bDark_5/70"
        onClick={onClose}
      ></div>

      <div className="bg-bDark_3 flex flex-col items-center rounded-3xl p-7 z-10">
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Channel Name"
          className="w-full p-2 outline-none border-2 text-sm placeholder:text-bLight_5 text-bLight_4 border-bLight_5/40 bg-bDark_4 rounded-full"
        />

        <div className="flex flex-col w-72 gap-4 items-center py-3  text-bLight_5">
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

          {channelType === "protected" && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 outline-none border-2 text-sm placeholder:text-bLight_5 
              text-bLight_4 border-bLight_5/40 bg-bDark_4 rounded-full"
            />
          )}
        </div>

        <div className="flex w-full items-center justify-between">
          <button onClick={onClose} className="text-org_1/60">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 ms-8 rounded-full bg-org_3/60 text-org_1 hover:bg-org_3/70 transition-all"
          >
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelCreation;
