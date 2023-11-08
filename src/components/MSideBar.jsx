import { phoneBottomBar } from "../constants";
import { Link, useLocation } from "react-router-dom";

const MSideBar = () => {
  const location = useLocation();

  return (
    <div
      className="md:hidden flex absolute right-0 -bottom-1 z-50 w-full h-max 
      bg-bDark_3 border-t-2 border-bLight_4 bg-opacity-60 backdrop-blur-3xl"
    >
      <ul className="flex flex-row justify-around w-full p-4 px-6">
        {phoneBottomBar.map((item) => (
          <li key={item.title}>
            <Link to={item.link}>
              <span
                className={`text-2xl text-bLight_2 ${
                  location.pathname === item.link ? "text-white text-3xl" : ""
                }`}
              >
                {<item.icon />}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MSideBar;
