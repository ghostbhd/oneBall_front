import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetHeaders } from "../../jwt_token";

const CallBack = () => {
  const history = useNavigate();
  // const Header = GetHeaders().head

  useEffect(() => {
  //   const check2FAStatus = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3009/2fa/status', {
  //         method: 'GET',
  //         headers: Header,
  //       });

  //       if (response.ok) {
  //         const twofaStatusData = await response.json();

  //         if (twofaStatusData.is_twofactor) {
  //           history('/welcomeback');
  //         } else {
            history('/');
  //         }
  //       } else {
  //         console.error('Failed to fetch 2FA status');
  //       }
  //     } catch (error) {
  //       console.error("Error fetching 2FA status", error);
  //     }
  //   };
  //   check2FAStatus();
  // }, [history, Header]);
  }, [history]);
  return <div></div>;
};

export default CallBack;
