import { profileData } from "../../data/mockApi";
import { useEffect, useState } from "react";
import style from "../../style";
import EditInfo from "./EditInfo";
import Details from "./Details";
import { getHeaders } from "../../jwt_token";

const Profile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const headers = getHeaders().headers;
  useEffect(() => {
    // profileData()
    fetch('http://localhost:3009/profileData', {
      method: 'GET',
      headers: headers,
    })
    .then(response => {
      if (response.ok) {
        return response.json();}
      })
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
    <div className={`w-full h-full flex flex-row`}>
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <>
          <div className={`w-7/12 h-full ${style.blueBlur} ${style.rounded}`}>
            <EditInfo data={data.editInnfo}/>
          </div>
          <div
            className={`w-4/12 h-full bg-gradient-to-b from-org_2/40 from-5% 
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
