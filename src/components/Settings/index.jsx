import style from "../../style";
import {useState, useEffect, useRef} from 'react';
import checkMark from "../../assets/Checkmark.gif";
import Switch from '@mui/material/Switch';
import { GetHeaders } from "../../jwt_token";
// import modeImage from "../../assets/mode2.png";


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

  const [isSuccess, setIsSuccess] = useState(false); 
  const storedValue = localStorage.getItem('isChecked');
  const [isChecked, setChecked] = useState(storedValue ? storedValue === 'true' : false);
  const [digits, setDigits] = useState(Array.from({ length: 6 }, () => ''));
  const inputRefs = useRef([]);
  const [warning, setWarning] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');


  const handleChange = () => 
  {
      const newValue = !isChecked;
      setChecked(newValue);
      localStorage.setItem('isChecked', String(newValue));

      if (newValue) {
        fetchQrCode();
      }

  };

  useEffect(() => 
  {
    if (isChecked) 
    {
      fetchQrCode();
    }
  }, [isChecked]);


  const handleDigitChange = (index, value) => 
  {
      if (/^\d*$/.test(value) && value.length <= 1) 
      {
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

  const headers = GetHeaders().headers;
  
  const fetchQrCode = async () => {
    try {
        const response = await fetch('http://localhost:3009/2fa', {
          method: 'GET',
          headers: headers,
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch QR code. Status: ${response.status}`);
        }
        const htmlString = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const imgElement = doc.querySelector('img');
        if (imgElement) {
          const imageUrl = imgElement.getAttribute('src'); 
          setQrImageUrl(imageUrl);
        } 
        else 
        {
          throw new Error('No img tag found in the HTML response');
        }
    } 
    catch (error) {
      console.error('Error fetching QR code:', error.message);
    }
  };

  const header = GetHeaders().headers;
  header.append("Content-Type", "application/json");


  const handleSubmit = async () => {
    try {
      console.clear();
      const passValue = digits.join('');
      const response = await fetch('http://localhost:3009/2fa', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ pass: passValue }),
      });
      if (!response.ok) 
      {
        if (response.status === 401) {
          setWarning('Incorrect Verification Code. Please try again.');
          setDigits(Array.from({ length: 6 }, () => ''));
        } 
        else {
          throw new Error('Failed to verify digits with the backend.');
        }
      }
      
      else 
      {
        console.clear();
        const { isValid } = await response.json();
        if (!isValid)
        {
          setWarning('');
          setIsSuccess(true);
          document.getElementById('app-root').style.filter = 'blur(5px)';
        } 
      }
    } catch (error) {
      console.error('Error handling verification:', error.message);
      setWarning('Failed to verify the code. Please try again.');
    }
  };
  
  return (

    <div className={`w-full h-full flex`}>

      {/* <img src={modeImage} alt="qr-code" className=" h-2/4 w-1/4 my-5 max-w-full h-auto rounded-lg"/> */}
        {isSuccess ? (
          <SuccessCheckmark />
        ) : (
            <div className={`sm:w-max px-20 p-6 gap-1 w-11/12 flex flex-col text-center items-center h-max m-auto relative ${style.blueBlur} ${style.rounded}`}>
              <p className={`text-2xl font-semibold text-bLight_4`}>Two-Factor Authentication</p>


              <div className="flex items-center pt-1.5">
                <Switch
                  color="default"
                  checked={isChecked}
                  onChange={handleChange}
                  sx={{
                    '& .MuiSwitch-thumb': {
                      backgroundColor: isChecked ? '#6398a4' : '#6398a4',
                    },
                  }}
                />
                <p className={`text-bLight_4 text-sm `}>
                  {isChecked ? 'Disable 2FA' : 'Enable 2FA'}
                </p>
              </div>


              {isChecked && 
              (
                  <>
                    
                    <img src={qrImageUrl} alt="qr-code" className="my-5 max-w-full h-auto rounded-lg" />
                    <p className={`text-bLight_4 text-sm leading-5 mb-5`}>
                      To enable 2-factor authentication, scan <br />
                      this QR Code with your Google Authentication App <br />
                      and enter the verification code below
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
                                    className="w-11 h-11 border border-gray-300 rounded px-2 py-1 text-center text-2xl mx-2"
                                    ref={(input) => (inputRefs.current[index] = input)}
                              />
                        </div>
                      ))} 
                    </div>

                    <div className="w-full flex flex-col items-center justify-center">
                      {warning && <p className="text-org_3 text-xs my-1">{warning}</p>}
                      <button
                        className="w-full p-4 bg-bDark_1 rounded-xl text-white text-sm mt-2"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>


                  </>
              )}
            </div>
          )}
      </div>
  );
};

export default Settings


