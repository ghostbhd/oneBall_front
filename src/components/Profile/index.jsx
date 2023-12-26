// import { profileData } from "../../data/mockApi";
import { useEffect, useState } from "react";
import style from "../../style";
import EditInfo from "./EditInfo";
import Details from "./Details";
import MDetails from "./MDetails";
import FriendRequests from "./FriendRequests";
import { GetHeaders } from "../../jwt_token";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useNavigate();
  const handleRedirect = (url) => {
    history(url);
  };
  const headers = GetHeaders().headers;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3009/profileData", {
        method: "GET",
        headers: headers,
      });
      if (response.status === 401) {
        handleRedirect("/Auth");
        console.log("Unauthorized. Please log in.");
        return;
      }
      const data = await response.json();
      console.log("Index profile data:", data);
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div
      className={`w-full sm:h-full sm:space-x-8 xl:space-x-10 flex sm:flex-row flex-col md:pb-4 pb-16 p-4 md:px-10 sm:pt-14 pt-6`}
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

            {/* Friend requests ------------------------- */}
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
/*

import React, { useState } from 'react';
import style from "../../style";
import qrImage from "./qr-test.svg";

const Settings = () => {
  const [digits, setDigits] = useState(Array.from({ length: 6 }, () => ''));
  const [activeInput, setActiveInput] = useState(0);
  const [warning, setWarning] = useState('');

  const handleDigitChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (index < digits.length - 1 && value !== '') {
        setActiveInput(index + 1);
      }
    }
  };

  const handleSubmit = () => {
    const correctDigits = ['1', '2', '3', '4', '5', '6'];

    if (digits.join('') === correctDigits.join('')) {
      // in case digits are correct
      setDigits(Array.from({ length: 6 }, () => ''));
      setWarning('');

      // Handle your submit logic here
    } else {
      // in case digits are incorrect
      setDigits(Array.from({ length: 6 }, () => ''));
      setWarning('Incorrect Verification Code. Please try again.');
    }
  };

  return (
    <div className={`w-full sm:h-full sm:space-x-8 xl:space-x-20 flex items-center justify-center sm:flex-row flex-col md:pb-4 pb-16 p-4 md:px-10 sm:pt-14 pt-16`}>
      <div className={`sm:w-7/12 w-full h-full relative overflow-y-auto ${style.blueBlur} ${style.rounded} text-center`}>
        <div className="flex flex-col items-center justify-center h-full">
          <p className={`text-2xl font-semibold text-bLight_4 mb-1 mt-8`}>Scan QR Code</p>
          <p className={`text-bLight_2 text-sm leading-5 mb-4`}>
            To be able to authorize transactions you need to scan <br />
            this QR Code with your Google Authentication App <br />
            and enter the verification code below
          </p>
          <img src={qrImage} alt="qr-code" className="mx-auto mb-4 mt-5 max-w-full h-auto" />
          <p className={`text-bLight_2 text-sm leading-5`}>
            Enter Verification Code :
          </p>
          <div className="digits-grid mt-4 flex justify-center">
            {digits.map((digit, index) => (
              <div className="digit-container" key={index}>
                <input
                  type="text"
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  id={`digit-${index}`}
                  maxLength={1}
                  className="w-10 h-10 border border-gray-300 rounded px-2 py-1 text-center text-2xl mx-2"
                />
              </div>
            ))}
          </div>
          {warning && <p className="text-bLight_1 text-xs mt-1">{warning}</p>}
          <button
            className="absolute bottom-10 left-1/4 w-1/2 h-12 bg-gradient-to-r from-bDark_3 to-bDark_5 text-white text-sm rounded transition duration-500 hover:bg-gradient-to-r hover:from-bDark_4 hover:to-bDark_3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

*/