import { icons } from "../../constants";
import style from "../../style";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`sm:w-4/12 w-max pr-10 h-max flex flex-row fixed z-50 sm:top-1 top-0 sm:right-2 right-0`}
    >
      <div className="w-max relative h-max ml-auto">
        {/* notification icon ------- */}
        <div
          className="text-xl text-bLight_5 ml-auto p-2 bg-bDark_4 rounded-full border-2 border-bLight_5/50 cursor-pointer"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          {<icons.notifications />}
        </div>

        {/* notification badge --------- */}
        <div
          ref={notificationRef}
          className={`absolute right-full overflow-hidden top-1/3 w-80 h-max bg-bDark_4 p-2 transform transition-all duration-500 ${
            style.rounded
          } ${
            showNotifications
              ? "translate-y-0 translate-x-0 opacity-100"
              : "-translate-y-6 translate-x-6 opacity-0 pointer-events-none"
          }`}
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
