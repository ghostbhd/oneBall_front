import { icons } from "../../constants";
import PropTypes from "prop-types";

const NotificationBadge = ({ notifRef, showNotif, setShowNotif }) => {
  return (
    <div
      ref={notifRef}
      className={`absolute flex flex-col right-0 h-screen z-50 text-bLight_2 top-0 sm:w-80 w-screen 
          border-l-2 border-bLight_5/20 p-2 bg-bDark_5/10 !backdrop-blur-[100px] shadow-4xl
          ${!showNotif ? "hidden" : ""}
        `}
    >
      {/* close badge ------ */}
      <div className={`w-full p-2 flex mb-3`}>
        <div
          className={`ml-auto text-3xl cursor-pointer`}
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
  );
};

NotificationBadge.propTypes = {
  notifRef: PropTypes.object.isRequired,
  showNotif: PropTypes.bool.isRequired,
  setShowNotif: PropTypes.func.isRequired,
};

export default NotificationBadge;
