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
    { id: 1,   name:  (<img src={ProfileTest} alt="UserProfile" className="h-12 w-12 ml-9 border-2 border-solid  border-org_3 overflow-hidden"  style={{ borderRadius: '1vw' }}/>, 'aya'), xp: 222, win: 2, lose: 2, badge: 'Leader' },
    { id: 2,   name: 'Player', xp: 543, win: 7, lose: 3, badge: 'Champion' },
    { id: 3,   name: 'Player', xp: 123, win: 1, lose: 5, badge: 'Rookie' },
    { id: 4,   name: 'Player', xp: 876, win: 10, lose: 0, badge: 'Master' },
    { id: 5,   name: 'Player', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 6,   name: 'Player', xp: 222, win: 2, lose: 2, badge: 'Leader' },
    { id: 7,   name: 'Player', xp: 543, win: 7, lose: 3, badge: 'Champion' },
    { id: 8,   name: 'Player', xp: 123, win: 1, lose: 5, badge: 'Rookie' },
    { id: 9,   name: 'Player', xp: 876, win: 10, lose: 0, badge: 'Master' },
    { id: 10, name: 'Player', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 11, name: 'Player', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 12, name: 'Player', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 13, name: 'Player', xp: 222, win: 2, lose: 2, badge: 'Leader' },
    { id: 14, name: 'Player', xp: 543, win: 7, lose: 3, badge: 'Champion' },
    { id: 15, name: 'Player', xp: 123, win: 1, lose: 5, badge: 'Rookie' },
    { id: 16, name: 'Player', xp: 876, win: 10, lose: 0, badge: 'Master' },
    { id: 17, name: 'Player', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 18, name: 'Player', xp: 456, win: 4, lose: 6, badge: 'Elite' },
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
          <span className="flex-1"></span>
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
          transition={{ duration: 0 }}
          className={`flex flex-col items-center ${style.boxWidth}`}
          style={{ maxHeight: "72vh", overflowY: "auto", width: "95%" }}
      >
        <ul className="w-full max-w-screen-md">
          {randomArray.map(item => (
            <li key={item.id} className={`w-full h-3/4 flex justify-around text-bLight_4 align-middle p-3 mt-2 rounded-2xl bg-bLight_5/40 `}>
              <TrophyImage position={item.id} />
              <span className="flex-1 w-10 text-center">{item.name}</span>
              <span className="flex-1 w-10 text-center">{item.xp}</span>
              <span className="flex-1 w-10 text-center">{item.win}</span>
              <span className="flex-1 w-10 text-center">{item.lose}</span>
              <span className="flex-1 w-10 text-center">{item.badge}</span>
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