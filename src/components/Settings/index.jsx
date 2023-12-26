import React, { useState } from 'react';
import style from "../../style";
import qrImage from "./qr-test.svg";
import checkMark from "../../assets/Checkmark.gif";


const SuccessCheckmark = () => {
  return (
    <div className="animate-success-check w-full h-16 text-center">
      <img src={checkMark} alt="checkMark" className="mx-auto mb-5  max-w-full h-16"/>
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

  const handleDigitChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
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
    <div className={`w-full sm:h-full sm:space-x-8 xl:space-x-20 flex items-center justify-center sm:flex-row flex-col md:pb-4 pb-16 p-4 md:px-10 sm:pt-14 pt-16`}>
      {isSuccess ? (
        <SuccessCheckmark />
      ) : (
        <div className={`sm:w-7/12 w-full h-5/6 relative overflow-y-auto ${style.blueBlur} ${style.rounded} text-center`}>
          <p className={`text-2xl font-semibold text-bLight_4 mb-1 mt-6`}>Scan QR Code</p>
          <p className={`text-bLight_4 text-sm leading-5`}>
            To enable 2-factor authentication, scan <br />
            this QR Code with your Google Authentication App <br />
            and enter the verification code below
          </p>
          <img src={qrImage} alt="qr-code" className="mx-auto mb-5 mt-5 max-w-full h-auto" />
          <p className={`text-bLight_2 text-lg leading-5`}>
            Enter Verification Code :
          </p>
          <div className="digits-grid mt-5 flex justify-center">
            {digits.map((digit, index) => (
              <div className="digit-container" key={index}>
                <input
                  type="text"
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  id={`digit-${index}`}
                  maxLength={1}
                  className="w-11 h-11 border border-gray-300 rounded px-2 py-1 text-center text-2xl mx-2"
                />
              </div>
            ))}
          </div>

        <div className="digits-grid mt-5 flex justify-center">
          {warning && <p className="text-err text-xs mt-14">{warning}</p>}

          <button
            className="absolute left-1/4 w-1/2 h-12 bg-gradient-to-r from-bDark_3 to-bDark_5 text-white text-sm rounded transition duration-500 hover:bg-gradient-to-r hover:from-bDark_4 hover:to-bDark_3"
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
