import style from "../../style";
import { motion } from 'framer-motion';
import GoldTrophyCup from "../../assets/GoldTrophyCup.svg";
import BronzeTrophyCup from "../../assets/BronzeTrophyCup.svg";
import SilverTrophyCup from "../../assets/SilverTrophyCup.svg";
import Hashtag from "../../assets/hashtag.svg";
import ProfileTest from "../../assets/test.jpg";


const TrophyImage = ({ position }) => {
  let trophyImage;

  switch (position) {
    case 1:
      trophyImage = <img src={GoldTrophyCup} alt="Gold Trophy" style={{ height: '45px', width: '45px' ,  marginLeft: '3%' }} />;
      break;
    case 2:
      trophyImage = <img src={SilverTrophyCup} alt="Silver Trophy" style={{ height: '45px', width: '45px' , marginLeft: '3%'}} />;
      break;
    case 3:
      trophyImage = <img src={BronzeTrophyCup} alt="Bronze Trophy" style={{ height: '45px', width: '45px' ,  marginLeft: '3%'}} />;
      break;
    default:
      // trophyImage = <img src={Hashtag} alt="Hashtag" style={{ height: '45px', width: '35px' ,  marginLeft: '2%', backgroundColor: 'green'}} />;
      trophyImage = (
        <div className="flex items-center justify-center h-12 w-10 mx-auto ml-8">
          <span className="font-bold text-center text-xl text-org_3">#{position}</span>
        </div>
      
      );
  }

  return trophyImage;
};



const Stats = () => {


  const randomArray = [
    { id: 1,   img: ProfileTest ,name:"player", xp: 222, win: 2, lose: 2, badge: 'Leader' },
    // { id: 2,   img: ProfileTest, name:"player",xp: 543, win: 7, lose: 3, badge: 'Champion' },
    // { id: 3,   img: ProfileTest, name:"player",xp: 123, win: 1, lose: 5, badge: 'Rookie' },
    // { id: 4,   img: ProfileTest, name:"player",xp: 876, win: 10, lose: 0, badge: 'Master' },
    // { id: 5,   img: ProfileTest,name:"player", xp: 456, win: 4, lose: 6, badge: 'Elite' },
    // { id: 6,   img: ProfileTest, name:"player",xp: 222, win: 2, lose: 2, badge: 'Leader' },
    // { id: 7,   img: ProfileTest, name:"player",xp: 543, win: 7, lose: 3, badge: 'Champion' },
    // { id: 8,   img: ProfileTest, name:"player",xp: 123, win: 1, lose: 5, badge: 'Rookie' },
    // { id: 9,   img: ProfileTest, name:"player",xp: 876, win: 10, lose: 0, badge: 'Master' },
    // { id: 10, img: ProfileTest, name:"player", xp: 456, win: 4, lose: 6, badge: 'Elite' },
    // { id: 11, img: ProfileTest, name:"player", xp: 456, win: 4, lose: 6, badge: 'Elite' },
    // { id: 12, img: ProfileTest, name:"player", xp: 456, win: 4, lose: 6, badge: 'Elite' },
    // { id: 13, img: ProfileTest, name:"player", xp: 222, win: 2, lose: 2, badge: 'Leader' },
    // { id: 14, img: ProfileTest, name:"player", xp: 543, win: 7, lose: 3, badge: 'Champion' },
    // { id: 15, img: ProfileTest, name:"player", xp: 123, win: 1, lose: 5, badge: 'Rookie' },
    // { id: 16, img: ProfileTest, name:"player", xp: 876, win: 10, lose: 0, badge: 'Master' },
    // { id: 17, img: ProfileTest, name:"player", xp: 456, win: 4, lose: 6, badge: 'Elite' },
    // { id: 18, img: ProfileTest, name:"player", xp: 456, win: 4, lose: 6, badge: 'Elite' },
  ];
  
  return (
    <div className="flex justify-center items-center w-full h-full">
      {/* <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -60 }}
        transition={{ duration: 2 }}
        className={`flex flex-col items-center p-5 px-6 bg-opacity-30 shadow-2xl ${style.blueBlur} ${style.rounded} ${style.boxWidth}`}
      > */}
      <div className={`flex flex-col items-center p-5 px-6 bg-opacity-30 shadow-2xl ${style.blueBlur} ${style.rounded} ${style.boxWidth}`}>
        <div className={`w-full max-w-screen-md flex flex-row text-bLight_2 font-medium text-sm p-2 px-4 mt-1 mb-1`}>
          <span className="flex-1">Info</span>
          <span className="flex-1 mx-auto w-5 text-center">Xp</span>
          <span className="flex-1 mx-auto w-5 text-center">Win</span>
          <span className="flex-1 mx-auto w-5 text-center">Lose</span>
          <span className="flex-1 mx-auto w-5 text-center">Badge</span>
        </div>
        <hr className="w-11/12 border-t border-bLight_5 my-3" />
      <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 2 }}
          className={`flex flex-col items-center ${style.boxWidth}`}
          style={{ maxHeight: "72vh", overflowY: "auto", width: "95%" }}
      >
        <ul className="flex flex-col w-full max-w-screen-md">
          {randomArray.map(item => (
            <li key={item.id} className={`flex justify-around text-bLight_4 align-middle p-3 mt-2 rounded-2xl bg-bLight_5/40 `}>
              {/* <TrophyImage position={item.id} />
              <span className="flex items-center mr-20 ml-5">
                <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg border-2 border-bDark_2" />
                <span className="flex-1 w-10 text-center">{item.name}</span>
              </span>

              <span className="flex items-center justify-center rounded mr-40 ml-10">{item.xp}</span>
              <span className="flex items-center justify-center rounded mr-40 ml-10">{item.win}</span>
              <span className="flex items-center justify-center rounded mr-20 ml-10">{item.lose}</span>
              <span className="flex-1 w-10 text-center">{item.badge}</span> */}
            </li>
          ))}
        </ul>
    </motion.div>
      {/* </motion.div> */}
    </div>
    </div>
  );
}

export default Stats