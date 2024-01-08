import style from '../../style';
import {useState, useEffect, useRef} from 'react';
import checkMark from "../../assets/Checkmark.gif";
import { GetHeaders } from "../../jwt_token";
import * as jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import CustomSwitch from "./CustomSwitch"
/*
    ====================== Success mark ======================
*/
const SuccessCheckmark = () => {
  return (
    <div className="animate-success-check w-full text-center">
      <img src={checkMark} alt="checkMark" className="mx-auto mb-5 max-w-full h-16"/>
      <p className="text-bLight_5 text-lg font-semibold mt-0 mb-0">
        2-Factor Authentication Enabled Successfully
      </p>
    </div>
  );
};

const Settings = () => {

    const [isSuccess, setIsSuccess] = useState(false); 
    const [digits, setDigits] = useState(Array.from({ length: 6 }, () => ''));
    const inputRefs = useRef([]);
    const [warning, setWarning] = useState('');
    const [qrImageUrl, setQrImageUrl] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [test, setTest] = useState(false);

    
/*
    =================== check status of 2fa =========================
*/


const Header = GetHeaders().headers;
  useEffect(() => {
    console.log("------------------------ im Hereeeeee --------------------------------------");
    const fetch2FAStatus = async () => {
      try {
        const response = await fetch('http://localhost:3009/2fa/status', {
          method: 'GET',
          headers:  Header,
        });
        
        if (response.ok) {
          const { is_twofactor } = await response.json();
          console.log('=====>> is_twofactor: =====>>', is_twofactor);
          // setTest(is_twofactor)
          //setChecked(is_twofactor);
          setTest(is_twofactor)
          if (is_twofactor)
            setChecked(true)
          
        }
        else
        {
          console.log('===>> Failed to fetch 2FA status:', response.statusText);
        }
      } catch (error) {
        console.log('===>> Error fetching 2FA status:', error.message);
      }
    };
    
    fetch2FAStatus();
  }, []);

  useEffect(() => 
  {
    if (isChecked) 
    {
      fetchQrCode();
    }
  }, [isChecked]);
/*
    ================== disable2FA ==========================
*/
const disable2FA = async () => {
  try {
    const response = await fetch('http://localhost:3009/2fa/disable', {
      method: 'GET',
      headers: Header,
    });

    if (response.ok) {
      console.log('2FA disabled successfully');
      setChecked(false);
      setTest(false);
    } else {
      console.error('Failed to disable 2FA:', response.status, response.statusText);

    }
  } catch (error) {
    console.error('Error disabling 2FA:', error.message);
  }
};

/*
    ============================================
*/
const handleChange = () => {
  const newValue = !isChecked;
  setChecked(newValue);
  localStorage.setItem('isChecked', String(newValue));

  if (newValue) {
    fetchQrCode();
  } else {
    disable2FA();
  }
};
/*
    ====================== Make sure the code is a number ======================
*/
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

/*
    ====================== Fetch qr code  ======================
*/
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
/*
    ====================== Check the verification code ======================
*/
    const token = Cookies.get("accessToken");
    const header = new Headers();
    header.append("Content-Type", "application/json");
    const username = token ? jwtDecode.jwtDecode(token).name : null;//


    const handleSubmit = async () => {
      try {
        const passValue = digits.join('');
        const response = await fetch('http://localhost:3009/2fa', {
          method: 'POST',
          headers: header,
          body: JSON.stringify({username: username , pass: passValue }),
        });
        if (!response.ok) 
        {
          console.log("im hereeee iffff");
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
            console.log("im hereeee elseeee");
            setWarning('');
            setIsSuccess(true);
            setChecked(false);
            document.getElementById('app-root').style.filter = 'blur(5px)';
        }
      } 
      catch (error) 
      {
        console.error('Error handling verification:', error.message);
        setWarning('Failed to verify the code. Please try again.');
      }
    };

      
    return (
      <div className={`w-full h-full flex`}>
        {isSuccess ? (
          <div className={`sm:w-max px-20 p-6 gap-1 w-11/12 flex flex-col text-center items-center h-max m-auto relative ${style.blueBlur} ${style.rounded}`}>
            <SuccessCheckmark />
          </div>
        ) : (
          <div className={`sm:w-max px-20 p-6 gap-1 w-11/12 flex flex-col text-center items-center h-max m-auto relative ${style.blueBlur} ${style.rounded}`}>
              <p className={`text-2xl font-semibold text-bLight_4`}>Two-Factor Authentication</p>
      
              <div className="flex items-center pt-1.5">
              <CustomSwitch isChecked={isChecked} handleChange={handleChange} />

                <p className={`text-bLight_4 text-sm ml-1`}>
                  {isChecked ? 'Disable 2FA' : 'Enable 2FA'}
                </p>
          </div>
    
            {isChecked && (
              <>
                <img
                  className="my-5 max-w-full h-auto rounded-lg"
                  style={test ? { display: 'none' } : {}}
                  src={qrImageUrl}
                  alt="qr-code"
                />
                <p
                  style={test ? { display: 'none' } : {}}
                  className={`text-bLight_4 text-sm leading-5 mb-5`}
                >
                  To enable 2-factor authentication, scan <br />
                  this QR Code with your Google Authentication App <br />
                  and enter the verification code below
                </p>
    
                <div
                  style={test ? { display: 'none' } : {}}
                  className="digits-grid flex flex-wrap justify-center pb-4"
                >
                    {digits.map((digit, index) => (
                      <div className="digit-container" key={index}>
                        <input
                          type="text"
                          value={digit}
                          onChange={(e) => handleDigitChange(index, e.target.value)}
                          id={`digit-${index}`}
                          maxLength={1}
                          className="w-11 h-11 border-2 border-bLight_4/50 outline-none text-bLight_4 bg-bDark_4 rounded px-2 py-1 text-center text-2xl mx-2"
                          ref={(input) => (inputRefs.current[index] = input)}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowRight' && index < digits.length - 1) {
                              inputRefs.current[index].focus();
                            } else if (e.key === 'ArrowLeft' && index > 0) {
                              inputRefs.current[index -1 ].focus();
                            }
                          }}
                          onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                        />
                      </div>
                    ))}

                </div>
    
                <div
                  style={test ? { display: 'none' } : {}}
                  className="w-full flex flex-col items-center justify-center"
                >
                  {warning && (
                    <p className="text-org_3 text-xs my-1">{warning}</p>
                  )}
                  <button
                    style={test ? { display: 'none' } : {}}
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


