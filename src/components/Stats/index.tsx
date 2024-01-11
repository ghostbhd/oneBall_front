import style from "../../style";
import GoldTrophyCup from "../../assets/GoldTrophyCup.svg";
import BronzeTrophyCup from "../../assets/BronzeTrophyCup.svg";
import SilverTrophyCup from "../../assets/SilverTrophyCup.svg";
import Hashtag from "../../assets/hashtag.svg";
import ProfileTest from "../../assets/test.jpg";
import config from "../../config";
import { GetHeaders } from "../../jwt_token";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface TrophyImageProps {
  position: number;
}

const TrophyImage: React.FC<TrophyImageProps> = ({ position }) => {
  let trophyImage;

  switch (position) {
    case 0:
      trophyImage = (
        <img
          src={GoldTrophyCup}
          alt="Gold Trophy"
          style={{ height: "45px", width: "45px" }}
        />
      );
      break;
    case 1:
      trophyImage = (
        <img
          src={SilverTrophyCup}
          alt="Silver Trophy"
          style={{ height: "45px", width: "45px" }}
        />
      );
      break;
    case 2:
      trophyImage = (
        <img
          src={BronzeTrophyCup}
          alt="Bronze Trophy"
          style={{ height: "45px", width: "45px" }}
        />
      );
      break;
    default:
      trophyImage = (
        <span className="flex items-center h-12 text-center font-bold pl-3">
          #{position + 1}
        </span>
      );
  }

  return trophyImage;
};

interface PlayerStats {
  id: number;
  name: React.ReactNode;
  xp: number;
  win: number;
  lose: number;
  games: number;
}

const Stats = () => {
  const [randomArray, setArr] = useState([]);
  const Header = GetHeaders().headers;
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  // const fetch = async () => {

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${config.domain}/stats`, {
        method: "GET",
        headers: Header,
      }).then(async (data) => {
        if (data.ok) {
          const setdata = await data.json();
          setArr(setdata);
          setLoading(false);
        } else {
          Cookies.remove("accessToken");
          history("/auth");
        }
      });
    }
    fetchData();
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full">
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <div
          className={`flex flex-col items-center p-5 px-6 bg-opacity-30 shadow-2xl ${style.blueBlur} ${style.rounded} ${style.boxWidth}`}
        >
          <div className="flex flex-row gap-2 w-full max-w-screen-md text-bLight_2  rounded-full border-bLight_5 p-4 mt-1 rounded-full  ">
            <span className="flex items-center justify-center mx-auto w-1/5 text-center"></span>
            <span className="flex items-center justify-center mx-auto w-1/5 text-center">
              Xp
            </span>
            <span className="flex items-center justify-center mx-auto w-1/5 text-center">
              Win
            </span>
            <span className="flex items-center justify-center mx-auto w-1/5 text-center">
              Lose
            </span>
            <span className="flex items-center justify-center  w-1/5  mx-auto text-center ">
              Games
            </span>
          </div>

          <hr className="w-11/12 border-t border-bLight_5 my-3" />

          <div
            className={`flex flex-col items-center ${style.boxWidth}`}
            style={{ maxHeight: "69vh", overflowY: "auto", width: "95%" }}
          >
            <ul className="flex flex-col gap-2 w-full max-w-screen-md">
              {randomArray.map((item, index) => (
                <li
                  key={index}
                  className={`w-full flex flex-row text-bLight_2 font-medium text-sm bg-bDark_3/60 p-4 mt-1 rounded-full `}
                >
                  <div className="flex flex-row w-1/5  mx-auto text-center font-bold">
                    <TrophyImage position={index} />
                    <span className=" flex items-center  w-max mx-auto text-center font-bold ">
                      {item.name}
                    </span>
                  </div>

                  <span className="flex items-center justify-center  w-1/5  mx-auto font-bold ">
                    {item.xp}
                  </span>

                  <span className="flex items-center justify-center  w-1/5  mx-auto  font-bold">
                    {item.win}
                  </span>
                  <span className=" flex items-center justify-center w-1/5  mx-auto  font-bold">
                    {item.lose}
                  </span>
                  <span className=" flex items-center justify-center  w-1/5  mx-auto  font-bold">
                    {item.games}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
