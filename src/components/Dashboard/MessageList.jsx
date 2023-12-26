import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { icons } from "../../constants";
import style from "../../style";
import { ImgBg } from "../../style";

const MessageList = ({ last4Msgs }) => {
  return (
    <div
      className={`
        h-max p-5 px-6 shadow-4xl relative
        ${style.blueBlur} ${style.rounded} ${style.boxWidth}
      `}
    >
      {/* head ***/}
      <div className={`flex w-full text-bLight_4 py-1`}>
        <span className="">Messages</span>
        <Link
          to="/messages"
          className={`ml-auto text-3xl font-bold hover:text-bLight_2 transition-colors`}
        >
          {<icons.toRight />}
        </Link>
      </div>
      {/* Message */}
      <ul className="w-full flex flex-col space-y-4 pt-4">
        {/* message item ****/}
        {last4Msgs && Array.isArray(last4Msgs) && last4Msgs.length > 0 ? ( // if is array and has items
          last4Msgs.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap w-full h-max rounded-full bg-bLight_5/60"
            >
              {/* image ****/}
              <Link
                key={item.username}
                to={"/profile/" + item.username}
                style={ImgBg({ img: item.image })}
                className={`w-[62px] h-[62px] rounded-full border-[5px]
                  ${
                    item.status === "online"
                      ? style.online
                      : item.status === "offline"
                      ? style.offline
                      : style.inGame
                  }`}
              ></Link>
              {/* text ****/}
              <div className="flex flex-col w-4/6 ml-4 pr-2">
                <span className="text-bLight_2 w-full">
                  @{item.username}
                  {item.ischannel ? <span className=""></span> : null}
                </span>
                <span className="text-white w-full text-sm truncate">
                  {item.lastMessage}
                </span>
              </div>
            </li>
          )) // else
        ) : (
          <p className="w-full text-bLight_4 text-center p-4">
            No recent messages available.
          </p>
        )}
      </ul>
    </div>
  );
};

MessageList.propTypes = {
  last4Msgs: PropTypes.array,
};

export default MessageList;
