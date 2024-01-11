import Reac, { useEffect, useState } from "react";
import style from "../../../style";
// import PropTypes from "prop-types";
import { useSocket } from "../../../Socketio";

const ChangePasswordInput = ({
  showChangePassword,
  setShowChangePassword,
  activeChannel,
  currentUserToken,
}) => {
  const [password, setPassword] = useState("");
  const socket = useSocket(); //TODO: add socket
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!showChangePassword) {
      setPassword("");
    }
  }, [showChangePassword]);

  const handleChangePassword = () => {
    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long");
      setPassword("");
      return;
    }

    socket.emit("ChanegePassword", {
      channelId: activeChannel,
      newPassword: password,
      userId: currentUserToken.id,
    });
    setShowChangePassword(false);
  };

  const handleRemovePassword = () => {
    socket.emit("removePass", {
      channelId: activeChannel,
      userId: currentUserToken.id,
    });
    setShowChangePassword(false);
  };

  return (
    <div
      className={`absolute w-full z-10 h-full top-0 left-0 bg-bDark_5/40 flex `}
    >
      <div
        className={`absolute w-full h-full left-0 top-0`}
        onClick={() => setShowChangePassword(false)}
      ></div>
      <div
        className={`w-1/3 flex flex-col p-4 rounded-3xl gap-4 h-max m-auto ${style.blueBlur}`}
      >
        <p className={`text-sm text-bLight_5`}>Change password</p>
        <div className="w-full">
          <input
            type="password"
            className={`w-full rounded-full p-2 outline-none bg-bDark_4 border-2 border-bLight_5/20 text-bLight_4 placeholder:text-bLight_5`}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleChangePassword}
          />
          <p className="text-org_1/60 text-xs px-2">{passwordError}</p>
        </div>

        <button
          onClick={handleChangePassword}
          className={`p-3 w-full bg-bLight_5/50 text-bLight_2 hover:bg-bLight_5/80 transition-all rounded-2xl`}
        >
          Change
        </button>
        <button
          onClick={handleRemovePassword}
          className={`p-3 w-full bg-org_3/20 text-org_1/40 hover:bg-org_3/50 transition-all rounded-2xl`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordInput;
