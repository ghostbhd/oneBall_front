import { profileData } from "../../data/mockApi";
import { useEffect, useState } from "react";
import style from "../../style";
import EditInfo from "./EditInfo";
import Details from "./Details";
import MDetails from "./MDetails";
import FriendRequests from "./FriendRequests";

const Profile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileData()
      .then((data) => {
        console.log(data); // Log the data to check its structure
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={`w-full sm:h-full space-x-8 flex sm:flex-row flex-col md:pb-4 pb-16 p-4 md:px-10 sm:pt-14 pt-16`}
    >
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <>
          {/* Mobile details ------------------------- */}
          <div className={`block sm:hidden mb-8 w-full h-max ${style.rounded}`}>
            <MDetails data={data.profileInfo} />
          </div>

          {/* Edit info and friend requests ------------------- */}
          <div
            className={`sm:w-8/12 w-full sm:h-full relative overflow-y-auto h-max ${style.blueBlur} ${style.rounded}`}
          >
            <EditInfo data={data.editInnfo} />
            <FriendRequests />
          </div>

          {/* Details -------------------------------------- */}
          <div
            className={`sm:w-4/12 w-full sm:h-full bg-gradient-to-b from-org_1/40 from-5% shadow-4xl
            via-bDark_1/50 to-bLight_5/20 ml-auto ${style.rounded} backdrop-blur-xl`}
          >
            <Details data={data.profileInfo} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
