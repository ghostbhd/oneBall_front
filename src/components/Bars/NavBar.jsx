import { icons } from "../../constants";
import { useState, useEffect, useRef } from "react";
import NotificationBadge from "./NotificationBadge";

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
  }, []);

  return (
    <div
      className={`h-auto absolute z-10 top-0 left-0 px-8 bg-bDark_4 w-full
      `}
    >
      <div className="md:w-max w-full relative flex flex-row items-center p-1 md:ml-auto  md:backdrop-blur-none backdrop-blur-3xl">
        {/* notification icon ------- */}
        <div
          className={`text-2xl text-bDark_4 md:ml-auto cursor-pointer p-2 bg-bLight_4/70 rounded-full`}
          onClick={() => setShowNotif(true)}
        >
          {<icons.notifications />}
        </div>

        {/* menu icon -------------- */}
        <div
          className={`md:hidden text-3xl text-bLight_5 ml-auto cursor-pointer`}
        >
          {<icons.menu />}
        </div>
      </div>

      {/* notification badge --------- */}
      {showNotif ? (
        <NotificationBadge {...{ notifRef, showNotif, setShowNotif }} />
      ) : null}
    </div>
  );
};

export default NavBar;
