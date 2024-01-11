import PropTypes from "prop-types";
import style from "../../../style";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../../../Socketio";

const AddPasswordInput = ({
  showAddPassword,
  setShowAddPassword,
  activeChannel,
  currentUserToken,
}) => {
  const [addPass, setAddPass] = useState("");
  const socket = useSocket();

  const handleAddPassword = () => {
    socket.emit("addpassword", {
      channelId: activeChannel,
      newPassword: addPass,
      userId: currentUserToken.id,
    });
    setShowAddPassword(false);
  };

  return (
    <div
      className={`absolute w-full z-10 h-full top-0 left-0 bg-bDark_5/40 flex`}
    >
      <div
        className={`absolute w-full h-full left-0 top-0`}
        onClick={() => setShowAddPassword(false)}
      ></div>
      <div
        className={`w-1/3 flex flex-col p-4 rounded-3xl gap-4 h-max m-auto ${style.blueBlur}`}
      >
        <p className={`text-sm text-bLight_5`}>Add password</p>
        <input
          type="password"
          className={`w-full rounded-full p-2 outline-none bg-bDark_4 border-2 border-bLight_5/20 text-bLight_4 placeholder:text-bLight_5`}
          placeholder="Enter password"
          value={addPass}
          onChange={(e) => setAddPass(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddPassword}
        />

        <button
          onClick={handleAddPassword}
          className={`p-3 w-full bg-bLight_5/50 text-bLight_2 hover:bg-bLight_5/80 transition-all rounded-2xl`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

AddPasswordInput.propTypes = {
  showAddPassword: PropTypes.bool,
  setShowAddPassword: PropTypes.func,
};

export default AddPasswordInput;
