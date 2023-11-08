import { profileData } from "../../data/mockApi";
import { useEffect, useState } from "react";
import style from "../../style";
import EditInfo from "./EditInfo";
import Details from "./Details";

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
    <div className={`w-full sm:h-full flex sm:flex-row flex-col`}>
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <>
          <div className={`sm:order-1 order-last sm:w-7/12 w-full sm:h-full h-max ${style.blueBlur} ${style.rounded}`}>
            <EditInfo data={data.editInnfo}/>
          </div>
          <div
            className={`sm:w-4/12 w-full sm:h-full bg-gradient-to-b from-org_2/40 from-5% 
            via-bDark_1/50 to-bDark_1/50 ml-auto ${style.rounded}`}
          >
            <Details data={data.profileInfo} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
