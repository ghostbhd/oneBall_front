import { useState, useEffect } from "react";
import { fetchDataFromMockApi } from "../../data/mockApi";
import MessageList from "./MessageList";
import ProfileDetails from "./ProfileDetails";

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
    <div className={`flex flex-wrap w-full h-full`}>
      {loading ? (
        <p className="w-full text-blue_light_4 text-center p-4">Loading...</p>
      ) : (
        <>
          {/* messages ---------------------------------------------------------------- */}
          <MessageList last4Msgs={data.last4Msg} />

          {/* profile ----------------------------------------------------------------- */}
          <ProfileDetails user={data.user} />
        </>
      )}
    </div>
  );
};

export default Dashboard;

// To Do: put message item into link
