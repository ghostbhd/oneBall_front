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
        <div className="h-5/5 rounded-b-2xl flex-grow overflow-y-auto">

            {channels.map((channel) => (
                <div
                    key={channel.id}
                    className={`flex items-center p-2 rounded-l-[50px] rounded-r-[20px] ${style.transition
                        } hover:bg-opacity-70 rounded-lg shadow-2xl  ${activeChannel === channel.id ? style.activeChatItem : ""
                        }`}
                    onClick={() => handleChannelClick(channel.id)}
                >
                    <div className="relative">
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



