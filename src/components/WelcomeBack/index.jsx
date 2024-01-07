import style from "../../style";
import { useState, useEffect, useRef } from "react";
import { GetHeaders } from "../../jwt_token";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getAccordionSummaryUtilityClass } from "@mui/material";

const WelcomeBack = () => {
  const [digits, setDigits] = useState(Array.from({ length: 6 }, () => ""));
  const [warning, setWarning] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleDigitChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (index < digits.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    }

    if (index < digits.length - 1 && value !== "") {
      setWarning("");
    }
  };

  /*
        ====================== Check the verification code ======================
    */
  const username = Cookies.get("username");
  const header = new Headers();
  header.append("Content-Type", "application/json");

  const handleSubmit = async () => {
    try {
      // console.clear();
      const passValue = digits.join("");
      console.log("Verification Code:", passValue);

      const response = await fetch("http://localhost:3009/2fa", {
        method: "POST",
        headers: header,
        body: JSON.stringify({ pass: passValue, username: username }),
      });

      console.log("Backend Response:", response);

      if (!response.ok) {
        if (response.status === 401) {
          console.log("im heereee in if >>>>>> ===== ");
          setWarning("Incorrect Verification Code. Please try again.");
          setDigits(Array.from({ length: 6 }, () => ""));
        } else {
          throw new Error("Failed to verify digits with the backend.");
        }
      } else {
        // console.clear();
        console.log("heereee at else  >>>>>> ===== ");
        const data = await response.json();
        console.log(data);
        Cookies.set("accessToken", data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log("im heereee in catch >>>>>> ===== ");
      console.error("Error handling verification:", error.message);
      setWarning("Failed to verify the code. Please try again.");
    }
  };

  return (
    <div className={`w-full h-full flex`}>
      <div
        className={`sm:w-max px-20 p-6 gap-1 w-11/12 flex flex-col text-center items-center h-max m-auto relative ${style.blueBlur} ${style.rounded}`}
      >
        <p className={`text-2xl font-semibold text-bLight_4`}>
          Your account is secured by 2FA
        </p>
        <p className={`text-bLight_4 text-sm leading-5 mb-5`}>
          Please open your authentication app <br />
          and enter your 2FA code below
        </p>
        <div className="digits-grid flex flex-wrap justify-center pb-4">
          {digits.map((digit, index) => (
            <div className="digit-container" key={index}>
              <input
                type="text"
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                id={`digit-${index}`}
                maxLength={1}
                className="w-10 h-10 border border-gray-300 rounded px-2 py-1 text-center text-2xl mx-2"
                ref={(input) => (inputRefs.current[index] = input)}
              />
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col items-center justify-center ">
          {warning && (
            <p className=" text-org_3 text-xs my-2 mb-4">{warning}</p>
          )}
          <div className="w-full flex flex-row items-center justify-center gap-3">
            <button className="w-2/4 p-4 bg-bDark_1 rounded-xl text-org_2 text-sm mt-2">
              <Link to="/Auth" className="text-white no-underline">
                Back to log in
              </Link>
            </button>

            <button
              className="w-2/4 p-4 bg-bDark_1 rounded-xl text-org_2 text-sm mt-2"
              onClick={handleSubmit}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBack;
