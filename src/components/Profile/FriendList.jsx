import React from 'react'

const FriendList = () => {
  const [friends, setFriends] = useState([
    {
      username: "user1",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user2",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user3",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user4",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user5",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user6",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user7",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user8",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user9",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user10",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user11",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user12",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user13",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user14",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user15",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user16",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user17",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user18",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user19",
      image: "/src/assets/avatar/jomjo.jpg",
    },
    {
      username: "user20",
      image: "/src/assets/avatar/jomjo.jpg",
    },
  ]);

  return (
    <div className={`w-full flex flex-col mt-8 h-2/5 p-4 rounded-3xl bg-bDark_5/20`}>
    {/* title ------------------------ */}
    <p className="text-bLight_4 text-2xl">Friends</p>
    {/* friend list ------------------------ */}
    <div className="w-full flex flex-wrap gap-4 justify-between overflow-y-auto p-2 rounded-3xl border-4 border-bLight_5/20">
      {friends.map((friend, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center"
        >
          <div
            className="w-16 h-16 rounded-full bg-bDark_1/50"
            style={ImgBg({ img: friend.image })}
          ></div>
          <p className="text-xs text-bLight_5">{friend.username}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default FriendList