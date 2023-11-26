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
  }, [notifRef]);


  return (
    <div
      className={`sm:w-4/12 w-max pr-10 h-auto flex flex-row fixed z-50 sm:top-1 top-0 sm:right-2 right-0`}
    >
      <div className="w-max relative ml-auto">
        {/* notification icon ------- */}
        <div
          ref={notifRef}
          className="text-xl text-bLight_5 ml-auto p-2 bg-bDark_4 rounded-full border-2 border-bLight_5/50 cursor-pointer"
          onClick={() => setShowNotif(!showNotif)}
        >
          {<icons.notifications />}
        </div>

        {/* notification badge --------- */}
        <div
          ref={notifRef}
          className={`absolute -right-4 h-max text-bLight_4 top-full w-80 bg-bDark_4 p-2 transform transition-all duration-500
            rounded-3xl shadow-5xl translate-y-2
          ${!showNotif ? "hidden" : ""}`}
        >
          {/* badge content */}
          <ul className="w-full">
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
