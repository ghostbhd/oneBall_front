import React, { useEffect, useState } from "react";
import { useSocket } from "../../Socketio.jsx";
import style, { ImgBg } from "../../style";

function ChannelList({ activeChannel, currentUserToken, setActiveChannel, typeOfChannel, setTypeOfChannel }) {
  const [channels, setChannels] = useState([]);
//   const [typeOfChannel, setTypeOfChannel] = useState("");
  const socket = useSocket();

  console.log("typeOfChannel is ", typeOfChannel); //! hehowa fin 7atit lik type of channel

  useEffect(() => {

    socket.on("channelType", (data) => {
      setTypeOfChannel(data.channelType);
      //   console.log("Channel type:=========================", data.channelType);
    });

    // socket.emit("getUserChannels", currentUserToken.id);

    socket.on("userChannels", (userChannels) => {
      console.log("Received userChannels:", userChannels);
      setChannels(userChannels);
    });

    socket.on("newChannelCreated", (newChannel) => {
      setChannels((prevChannels) => [...prevChannels, newChannel]);
    });

    return () => {
      socket.off("channelType");
      socket.off("userChannels");
      socket.off("newChannelCreated");
    };
  }, [socket, currentUserToken.id]);

  const handleChannelClick = (activeChannel) => {
    setActiveChannel(activeChannel);
    socket.emit("getChannelType", activeChannel); 
    console.log("active channel is => ", activeChannel);
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
