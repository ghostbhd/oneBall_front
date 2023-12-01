import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { userProfileData } from "../../data/mockApi";
import UserInfo from "./UserInfo";

const UserProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { username } = useParams();

  useEffect(() => {
    // fetch(`http://localhost:3000/api/user/${username}`) // Fetch the data from the API
    userProfileData()
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log("Data fetched", data);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  }, []);

  return (
    <div className={`w-full h-full flex p-6 pt-16`}>
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <>
          {/* User details row --------------------------*/}

          <div className="flex flex-col w-8/12 h-full">
            {/* user Infr ----- */}
            <UserInfo data={data} />
          </div>
          {/* User game status ------------------------------*/}
          <div
            className={`flex flex-col w-[30%] h-full bg-bDark_1/40 ml-auto`}
          ></div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
