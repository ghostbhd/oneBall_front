import React, { useEffect, useState } from "react";
import { useSocket } from "../../Socketio.jsx";
import style from "../../style";

function ChannelList({ activeChannel, currentUserToken, setActiveChannel }) {
  const [channels, setChannels] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.emit("getUserChannels", currentUserToken.id);

    socket.on("userChannels", (userChannels) => {
      console.log("Received userChannels:", userChannels);
      setChannels(userChannels);
    });

    socket.on("newChannelCreated", (newChannel) => {
      setChannels((prevChannels) => [...prevChannels, newChannel]);
    });

    return () => {
      socket.off("userChannels");
    };
  }, [socket, currentUserToken.id]);

  const handleChannelClick = (activeChannel) => {
    setActiveChannel(activeChannel);
    console.log("active channel is => ", activeChannel);
  };

  return (
    <div
      className={`rounded-b-2xl flex flex-col overflow-y-auto ${style.blueBlur}`}
    >
      {channels.map((channel) => (
        <div
          key={channel.id}
          className={`flex items-center p-2 rounded-l-[50px] rounded-r-[20px] rounded-lg shadow-2xl  ${
            activeChannel === channel.id ? "bg-bLight_4" : ""
          }`}
          onClick={() => handleChannelClick(channel.id)}
        >
          <div className="">
            <img
              src="https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg"
              alt={channel.Channel}
              className="w-12 h-12 rounded-full "
            />
          </div>
          <h3 className="text-white px-3">{channel.Channel}</h3>
        </div>
      ))}
    </div>
  );
}

export default ChannelList;
