import { icons } from "../../constants";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifRef, showNotif]);

  return (
    <div
      className={`sm:w-4/12 w-max pr-10 h-auto flex absolute flex-row z-40 top-0 right-0 p-1`}
    >
      <div className="w-max relative ml-auto">
        {/* notification icon ------- */}
        <div
          className={`text-xl text-bLight_5 ml-auto p-2 bg-bDark_4 rounded-full border-2 border-bLight_5/50 cursor-pointer`}
          onClick={() => setShowNotif(true)}
        >
          {<icons.notifications />}
        </div>
      </div>

      {/* notification badge --------- */}
      <div
        ref={notifRef}
        className={`absolute flex flex-col right-0 h-screen z-50 text-bLight_4 top-0 w-80 
          border-l-2 border-bLight_4/40 p-2 bg-bDark_5/60 backdrop-blur-3xl shadow-4xl
          ${!showNotif ? "hidden" : ""}
        `}
      >
        {/* close badge ------ */}
        <div className={`w-full p-2 flex mb-3`}>
          <div
            className={`ml-auto text-xl cursor-pointer`}
            onClick={() => setShowNotif(false)}
          >
            {<icons.xmark />}
          </div>
        </div>

        {/* items ---------------- */}
        <ul className="w-full h-full flex flex-col space-y-2 overflow-y-auto">
          <li className={`w-full flex flex-row bg-bDark_1/70 p-3 rounded-xl`}>
            test
          </li>
          <li className={`w-full flex flex-row bg-bDark_1/70 p-3 rounded-xl`}>
            test
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
