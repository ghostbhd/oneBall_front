import { icons } from "../../constants";
import { useState, useEffect, useRef } from "react";
import style from "../../style";

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
      className={`md:w-4/12 w-full md:pr-10 h-auto absolute z-40 top-0 right-0 md:p-1 
        md:bg-transparent bg-bDark_4/90
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
        <div className={`md:hidden text-3xl text-bLight_5 ml-auto cursor-pointer`}>
          {<icons.menu />}
        </div>
      </div>

      {/* notification badge --------- */}
      <div
        ref={notifRef}
        className={`absolute flex flex-col right-0 h-screen z-50 text-bLight_2 top-0 w-80 
          border-l-2 border-bLight_5/20 p-2 bg-bDark_5/10 !backdrop-blur-[100px] shadow-4xl
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
        <ul className="w-full h-full flex flex-col gap-2 overflow-y-auto">
          <li className={`w-full flex flex-row bg-bDark_1/70 p-3 rounded-2xl`}>
            test
          </li>
          <li className={`w-full flex flex-row bg-bDark_1/70 p-3 rounded-2xl`}>
            test
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
