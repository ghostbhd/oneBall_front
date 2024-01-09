import style from "../../style";
import GoldTrophyCup from "../../assets/GoldTrophyCup.svg";
import BronzeTrophyCup from "../../assets/BronzeTrophyCup.svg";
import SilverTrophyCup from "../../assets/SilverTrophyCup.svg";
import Hashtag from "../../assets/hashtag.svg";
import ProfileTest from "../../assets/test.jpg";

interface TrophyImageProps {
  position: number;
}

const TrophyImage: React.FC<TrophyImageProps> = ({ position }) => {
  let trophyImage;

  switch (position) {
    case 1:
      trophyImage = (
        <img
          src={GoldTrophyCup}
          alt="Gold Trophy"
          style={{ height: "45px", width: "45px" }}
        />
      );
      break;
    case 2:
      trophyImage = (
        <img
          src={SilverTrophyCup}
          alt="Silver Trophy"
          style={{ height: "45px", width: "45px" }}
        />
      );
      break;
    case 3:
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
          #{position}
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
  badge: string;
}

const Stats: React.FC = () => {
  const randomArray: PlayerStats[] = [
    {
      id: 1,
      name: "Player",
      xp: 2,
      win: 2,
      lose: 2,
      badge: "Leader",
    },
    {
      id: 2,
      name: "Player",
      xp: 543,
      win: 7,
      lose: 3,
      badge: "Champion",
    },
    {
      id: 3,
      name: "Player",
      xp: 123,
      win: 1,
      lose: 5,
      badge: "Rookie",
    },
    {
      id: 4,
      name: "Player",
      xp: 876,
      win: 10,
      lose: 0,
      badge: "Master",
    },
    {
      id: 5,
      name: "Player",
      xp: 456,
      win: 4,
      lose: 6,
      badge: "Elite",
    },
    {
      id: 6,
      name: "Player",
      xp: 222,
      win: 2,
      lose: 2,
      badge: "Leader",
    },
    {
      id: 7,
      name: "Player",
      xp: 456,
      win: 4,
      lose: 6,
      badge: "Elite",
    },
    {
      id: 8,
      name: "Player",
      xp: 222,
      win: 2,
      lose: 2,
      badge: "Leader",
    },
  ];

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`flex flex-col items-center p-5 px-6 bg-opacity-30 shadow-2xl ${style.blueBlur} ${style.rounded} ${style.boxWidth}`}>
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
            Badge
          </span>
        </div>

        <hr className="w-11/12 border-t border-bLight_5 my-3" />

        <div
          className={`flex flex-col items-center ${style.boxWidth}`}
          style={{ maxHeight: "69vh", overflowY: "auto", width: "95%" }}>
          <ul className="flex flex-col gap-2 w-full max-w-screen-md">
            {randomArray.map((item) => (
              <li
                key={item.id}
                className={`w-full flex flex-row text-bLight_2 font-medium text-sm bg-bDark_3/60 p-4 mt-1 rounded-full `}>
                <div className="flex flex-row w-1/5  mx-auto text-center font-bold">
                  <TrophyImage position={item.id} />
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
                  {item.badge}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stats;