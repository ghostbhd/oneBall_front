import style from "../../style";
import { motion } from 'framer-motion';
const Stats = () => {

  const randomArray = [
    { id: 1, name: '#1 Player', xp: 222, win: 2, lose: 2, badge: 'Leader' },
    { id: 2, name: '#2 Player', xp: 543, win: 7, lose: 3, badge: 'Champion' },
    { id: 3, name: '#3 Player', xp: 123, win: 1, lose: 5, badge: 'Rookie' },
    { id: 4, name: '#4 Player', xp: 876, win: 10, lose: 0, badge: 'Master' },
    { id: 5, name: '#5 Player', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 6, name: '#6 Player', xp: 222, win: 2, lose: 2, badge: 'Leader' },
    { id: 7, name: '#7 Player', xp: 543, win: 7, lose: 3, badge: 'Champion' },
    { id: 8, name: '#8 Player', xp: 123, win: 1, lose: 5, badge: 'Rookie' },
    { id: 9, name: '#9 Player', xp: 876, win: 10, lose: 0, badge: 'Master' },
    { id: 10, name: 'Player #10', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 11, name: 'Player #11', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 12, name: 'Player #12', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 13, name: 'Player #13', xp: 222, win: 2, lose: 2, badge: 'Leader' },
    { id: 14, name: 'Player #14', xp: 543, win: 7, lose: 3, badge: 'Champion' },
    { id: 15, name: 'Player #15', xp: 123, win: 1, lose: 5, badge: 'Rookie' },
    { id: 16, name: 'Player #16', xp: 876, win: 10, lose: 0, badge: 'Master' },
    { id: 17, name: 'Player #17', xp: 456, win: 4, lose: 6, badge: 'Elite' },
    { id: 18, name: 'Player #18', xp: 456, win: 4, lose: 6, badge: 'Elite' },
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
          transition={{ duration: 2 }}
          className={`flex flex-col items-center ${style.boxWidth}`}
          style={{ maxHeight: "72vh", overflowY: "auto", width: "95%" }}
      >
        <ul className="w-full max-w-screen-md">
          {randomArray.map(item => (
            <li key={item.id} className={`w-full h-3/4 flex justify-around text-bLight_4 align-middle p-3 mt-2 rounded-2xl bg-bLight_5/40 `}>
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