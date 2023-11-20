import { profileData } from "../../data/mockApi";
import { useEffect, useState } from "react";
import style from "../../style";
import EditInfo from "./EditInfo";
import Details from "./Details";
import { useNavigate } from 'react-router-dom';



const Profile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const  history = useNavigate ();
  const handleRedirect = (url) => {
    history(url);
  }
  useEffect(() => {
   const fetchData = async () => {
    const headers = new Headers();
      const jwtCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='));
        console.log('JWT:++++++++++++', document.cookie);
      if (jwtCookie) {
        const jwt = jwtCookie.split('=')[1];
        console.log('JWT:-----------', jwt);
    console.log("=-=-=-=-=-=--0-0--=-=--0-0" + `Bearer ${jwt}`);
    headers.append('Authorization', `Bearer ${jwt}`)
    }
    else {
       handleRedirect('/Auth'); 
      }
    const response = await fetch('http://localhost:3009/profileData', {
      method: 'GET',
      headers: headers,
    })
    if (response.status === 401) {
       handleRedirect('/Auth'); 
        console.log('Unauthorized. Please log in.');
        return;
    }
        const data = await response.json();
      // .then(response => {
      //   if (response.ok) {
      //     // console.log( 'hhhhhhhhhhhhhhhello ' + response.status)
      //   if (response.status === 401) {
      //       handleRedirect(); 
      //       console.log('Unauthorized. Please log in.');
      //       return;
      //    }
      //     return response.json();}
      //   })
      // .then((data) => {
          console.log( 'hhhhhhhhhhhhhhhello ' + data)
        console.log(data); 
        setData(data);
        setLoading(false);
      // })
      // .catch((err) => {
      //   console.log("Error fetching data", err);
      //   setLoading(false);
      // });
    }
    fetchData();
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
