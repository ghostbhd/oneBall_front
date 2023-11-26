import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userProfileData } from "../../data/mockApi";

const UserProfile = () => {
  const [data, setData] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    // fetch(`http://localhost:3000/api/user/${username}`) // Fetch the data from the API
    userProfileData()
      .then((data) => {
        setData(data);
        console.log("Data fetched", data);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  }, []);

  return (
    <div className={`w-full h-full flex p-6 pt-16`}>
      {/* User details row */}
      <div className="flex flex-col w-8/12 h-full bg-bDark_1/40"></div>
      {/* User game status */}
      <div className={`flex flex-col w-[30%] h-full bg-bDark_1/40 ml-auto`}>
        {data.username}
      </div>
    </div>
  );
};

export default UserProfile;
