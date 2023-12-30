import { friendRequestData } from "../../data/mockApi";
import { useEffect, useState } from "react";
import { ImgBg } from "../../style";
import { icons } from "../../constants";
import { Link } from "react-router-dom";
import { useSocket } from "../../Socketio";

const FriendRequests = () => {
  const [data, setData] = useState([]);
  const socket = useSocket();

  const handelAccept = ({ username }) => {
    console.log("accept");
    console.log(username);
    // delete user from data object
    data.forEach((item, index) => {
      if (item.username === username) {
        data.splice(index, 1);
        setData([...data]); // update data
      }
    });
  };

  const pushData = (obj) => {
    data.push(obj);
    setData([...data]);
  };

  const printData = () => {
    console.log("--------------------data", data);
  };

  const handelDecline = ({ username }) => {
    console.log("decline");
    console.log(username);
    console.log("data", data)
    // delete user from data object
    data.forEach((item, index) => {
      if (item.username === username) {
        data.splice(index, 1);
        setData([...data]); // update data
      }
    });
  };


  useEffect(() => {
    printData();
    socket.on("Friend-Request", (reqData) => {
      console.log("FriendRequests", reqData);
      const newData = {username:reqData.username, fullName: reqData.fullName,image: reqData.image}
      // adding data to previous data
      pushData(newData);
      printData();
    });

    socket.on("Friend-Refuse", (data) => {
      console.log("Refuse", data);
      const username = data.username;
      // delete from data if the username is exist in data
      handelDecline({ username: username});
      printData();
    });

    return () => {
      socket.off("Friend-Request");
      socket.off("Friend-Refuse");
    };
  }, []);

  return (
    <div
      className={`w-full h-max flex flex-col px-6 pb-2 ${
        data.length === 0 ? "hidden" : ""
      }`}
    >
      {/* friend request header ----------------------------------------------------------------*/}
      <div className={`w-full flex pb-2`}>
        <p className={`text-bLight_4`}>Friend Requests</p>
      </div>

      <ul className="w-full pb-6 h-max relative overflow-x-auto flex flex-row gap-6">
        {data.map((item) => (
          // friend request item -----------------------------------------------------------------
          <li
            key={item.username}
            className={`flex flex-col items-center relative w-32 z-50 shadow-xl 
              bg-gradient-to-bl from-bLight_5/50 to-bLight_5/10 p-2 rounded-2xl
            `}
          >
            {/* user image ------- */}
            <Link
              key={item.username}
              to={"/profile/" + item.username}
              className={`w-20 h-20 rounded-full`}
              style={ImgBg({ img: item.image })}
            ></Link>
            {/* username and fullName ---- */}
            <p
              title={item.fullName}
              className={`text-bLight_2 text-sm w-full text-center truncate`}
            >
              {item.fullName}
            </p>
            <p
              className={`text-bLight_2/80 text-xs w-full text-center truncate`}
            >
              @{item.username}
            </p>

            {/* accept and decline buttons ----------------- */}
            <div
              className={`w-full flex text-xl justify-between mt-4 items-center`}
            >
              {/* decline button ----- */}
              <div
                className="text-bLight_4 cursor-pointer"
                onClick={() => handelDecline({ username: item.username })}
              >
                {<icons.xmark />}
              </div>
              {/* accept button ------ */}
              <div
                className="text-org_3 cursor-pointer  p-1 rounded-full"
                onClick={() => handelAccept({ username: item.username })}
              >
                {<icons.check />}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
