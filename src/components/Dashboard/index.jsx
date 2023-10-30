import { useState, useEffect } from "react";
import { fetchDataFromMockApi } from "../../data/mockApi";
import MessageList from "./MessageList";
import ProfileDetails from "./ProfileDetails";
import GameBtn from "./GameBtn";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFromMockApi()
      .then((data) => {
        console.log(data); // Log the data to check its structure
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`flex flex-row w-full h-full`}>
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <>
          <div className="w-1/2 flex flex-col space-y-14">
            {/* messages ---------------------------------------------------------------- */}
            <MessageList last4Msgs={data.last4Msg} />
            {/* Game -------------------------------------------------------------------- */}
            <GameBtn />
          </div>
          <div className="w-1/2 flex flex-col">
            {/* profile ----------------------------------------------------------------- */}
            <ProfileDetails user={data.user} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

// To Do: put message item into link
