import { friendRequestData } from "../../data/mockApi";
import { useEffect, useState } from "react";
import { ImgBg } from "../../style";
import { icons } from "../../constants";

const FriendRequests = () => {
  const [data, setData] = useState([]);

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

  const handelDecline = ({ username }) => {
    console.log("decline");
    console.log(username);
    // delete user from data object
    data.forEach((item, index) => {
      if (item.username === username) {
        data.splice(index, 1);
        setData([...data]); // update data
      }
    });
  };
  useEffect(() => {
    friendRequestData()
      .then((data) => {
        console.log(data); // Log the data to check its structure
        setData(data);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
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

      <ul className="w-full pb-6 h-max relative overflow-x-auto flex flex-row space-x-4">
        {data.map((item) => (
          // friend request item -----------------------------------------------------------------
          <li
            key={item.id}
            className={`flex flex-col items-center relative w-32 z-50 shadow-xl 
              bg-gradient-to-bl from-bLight_5/50 to-bLight_5/10 p-4 rounded-2xl
            `}
          >
            {/* user image ------- */}
            <div
              className={`w-20 h-20 rounded-full`}
              style={ImgBg({ img: item.image })}
            ></div>
            {/* username and fullName ---- */}
            <p title={item.fullName} className={`text-bLight_2 text-sm w-full text-center truncate`}>{item.fullName}</p>
            <p className={`text-bLight_2/80 text-xs w-full text-center truncate`}>@{item.username}</p>

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
