import { useEffect, useState } from "react";
import { useSocket } from "../../../Socketio";
import { chatIcons } from "../../../constants/index.js";

function ChannelList({
  activeChannel,
  currentUserToken,
  setActiveChannel,
  typeOfChannel,
  setTypeOfChannel,
}) {
  const [channels, setChannels] = useState([]);
  const socket: any = useSocket();

  useEffect(() => {
    socket.on("channelType", (data) => {
      setTypeOfChannel(data.channelType);
    });


    socket.on("userChannels", (userChannels) => {
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
  }, [socket, activeChannel]);

  useEffect(() => {
    socket.emit("getUserChannels", currentUserToken.id);
  },[activeChannel]);

  const handleChannelClick = (activeChannel) => {
    setActiveChannel(activeChannel);
    socket.emit("getChannelType", activeChannel);
    socket.emit("autojoined", {channelId: activeChannel, userId: currentUserToken.id})
  };

  return (
    <div className={`flex flex-col overflow-y-auto gap-2`}>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className={`flex items-center p-2 px-4 bg-bLight_5/10 rounded-full cursor-pointer ${
            channel.id === activeChannel ? "bg-bLight_5/50" : "banana"
          }`}
          onClick={() => handleChannelClick(channel.id)}
        >
          {console.log("channel id is ", channel.id, "active channel is ", activeChannel)}
          <div className="text-bLight_4">#{channel.Channel}</div>
          {/* lock icon for protectd channel */}
          {channel.protected ? <div className={`text-bLight_5 ml-auto`}>{<chatIcons.lock />}</div> : null}
        </div>
      ))}
    </div>
  );
}

export default ChannelList;
