import React, { useState, useRef } from 'react';
import style from "../../style";
import qrImage from "./qr-test.svg";
import checkMark from "../../assets/Checkmark.gif";

const SuccessCheckmark = () => {
  return (
    <div className="animate-success-check w-full text-center">
      <img src={checkMark} alt="checkMark" className="mx-auto mb-5 max-w-full h-16"/>
      <p className="text-greenclr text-lg font-semibold mt-0 mb-0">
        2-Factor Authentication Enabled Successfully
      </p>
    </div>
  );
};

const Settings = () => {
  const [digits, setDigits] = useState(Array.from({ length: 6 }, () => ''));
  const [warning, setWarning] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef([]);

  const handleDigitChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (index < digits.length - 1 && value !== '') {
        inputRefs.current[index + 1].focus();
      }
    }

    if (index < digits.length - 1 && value !== '') {
      setWarning('');
    }
  };

  const handleSubmit = () => {
    const correctDigits = ['1', '2', '3', '4', '5', '6'];

    if (digits.join('') === correctDigits.join('')) {
      setDigits(Array.from({ length: 6 }, () => ''));
      setWarning('');
      setIsSuccess(true);

      // Apply blur effect to the background
      document.getElementById('app-root').style.filter = 'blur(5px)';
    } else {
      setDigits(Array.from({ length: 6 }, () => ''));
      setWarning('Incorrect Verification Code. Please try again.');
    }
  };

  return (
    <div className={`w-full h-full flex`}>
      {isSuccess ? (
        <SuccessCheckmark />
      ) : (
        <div className={`sm:w-max px-20 p-6 gap-2 w-11/12 flex flex-col text-center items-center h-max m-auto relative ${style.blueBlur} ${style.rounded}`}>
          <p className={`text-2xl font-semibold text-bLight_4`}>Scan QR Code</p>
          <p className={`text-bLight_4 text-sm leading-5`}>
            To enable 2-factor authentication, scan <br />
            this QR Code with your Google Authentication App <br />
            and enter the verification code below
          </p>
          <img src={qrImage} alt="qr-code" className="my-5 max-w-full h-auto" />
          <p className={`text-bLight_2 text-lg leading-5`}>
            Enter Verification Code :
          </p>
          <div className="digits-grid flex justify-center">
            {digits.map((digit, index) => (
              <div className="digit-container" key={index}>
                <input
                  type="text"
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  id={`digit-${index}`}
                  maxLength={1}
                  className="w-11 h-11 border border-gray-300 rounded px-2 py-1 text-center text-2xl mx-2"
                  ref={(input) => (inputRefs.current[index] = input)}
                />
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            {warning && <p className="text-org_3 text-xs my-2">{warning}</p>}

            <button
              className="w-full p-4 bg-bDark_1 rounded-xl text-white text-sm"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
