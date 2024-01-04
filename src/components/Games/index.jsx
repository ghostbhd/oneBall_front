import GamesHistory from "./GamesHistory";
import { useState, useEffect } from "react";
import { gamesData } from "../../data/mockApi";
import Buttons from "./Buttons";
import style from "../../style";

const Games = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gamesData()
      .then((data) => {
        console.log(data); // Log the data to check ts structure
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`w-full md:p-8 p-4 md:pt-14 pb-20 h-full flex sm:flex-row flex-col gap-8`}>
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Waiting for l3do
        </p>
      ) : (
        <>
          {/* Game details -----------------------------------------*/}
          <div className={`md:w-8/12 gap-6 flex flex-col sm:w-7/12 w-full h-full`}>
            {/* buttons ----- */}
            <Buttons />
            {/* game details --- */}
            <div className={`w-full h-full flex ${style.blueBlur} ${style.rounded}`}>

            </div>
            
          </div>
          {/* Game history --------------------------------------------*/}
          <GamesHistory gamehistory={data.gamesHistory} />

          <div className={`absolute hidden backdrop-blur-lg z-20 top-0 left-0 bg-red-800/20 w-full h-full`}>
            {/* game component */}
          </div>
        </>
      )}
    </div>
  );
};

export default Games;
