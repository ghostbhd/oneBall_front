import React, { useEffect, useState } from "react";
import { useSocket } from "../../Socketio.jsx";
import style, { ImgBg } from "../../style";

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

  const handleChannelClick = (channelId) => {
    setActiveChannel(channelId);

    console.log("active channel is => ", channelId);
  };

  return (
    <div className={`flex flex-col overflow-y-auto gap-2`}>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className={`flex items-center p-2 rounded-full cursor-pointer ${
            activeChannel === channel.id ? "bg-bLight_5/50" : "banana"
          }`}
          onClick={() => handleChannelClick(channel.id)}
        >
          <div
            className={`w-12 h-12 rounded-full`}
            style={ImgBg({
              img: "https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg",
            })}
          ></div>
          <p className="text-bLight_4 px-3">#{channel.Channel}</p>
        </div>
      ))}
    </div>
  );
}

export default ChannelList;
