import { friendRequestData } from "../../data/mockApi";
import { useEffect, useState } from "react";
import { ImgBg } from "../../style";
import style from "../../style";

const FriendRequests = () => {
  const [data, setData] = useState([]);

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
    <div className={`w-full h-max flex`}>
      {/* friend card*/}
      <ul className="w-full overflow-hidden overflow-x-auto flex flex-row space-x-4 px-6">
        {data.map((item) => (
          <li
            key={item.id}
            className={`flex flex-col items-center relative w-28 bg-bDark_1/50 p-4 ${style.rounded}`}
          >
            <div
              className={`w-20 h-20 rounded-full`}
              style={ImgBg({ img: item.image })}
            ></div>
            <p className={`text-bLight_2 text-sm`}>@{item.username}</p>
            <p className={`text-bLight_4 text-xs`}>{item.fullName}</p>
            <div>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
