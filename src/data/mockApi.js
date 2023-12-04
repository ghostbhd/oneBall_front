const dashboard = {
  user: {
    id: 1,
    username: "user1",
    image: "/src/assets/avatar/Strong Baby.jpg",
    status: "online",
    fullName: "User 1",
    level: 5.4,
    games: 50,
    win: 37,
    lose: 13,
  },
  last4Msg: [
    {
      id: 1,
      username: "user1",
      image: "https://picsum.photos/200/200",
      lastMessage: "Hello",
      status: "online",
      ischannel: false,
    },
    {
      id: 2,
      username: "user2",
      image: "https://picsum.photos/200/200",
      lastMessage: "Hi there",
      status: "online",
      ischannel: true,
      channelName: "channel1",
    },
    {
      id: 3,
      username: "user3",
      image: "https://picsum.photos/200/200",
      lastMessage: "How are you?",
      status: "offline",
      ischannel: false,
    },
    {
      id: 4,
      username: "user4",
      image: "https://picsum.photos/200/200",
      lastMessage:
        "Good morning, goooooooooooooooooooooooooooooooooooooooooooooooo",
      status: "inGame",
      ischannel: false,
    },
  ],
  last6Games: [
    {
      id: 1,
      opponent: "user1",
      fullName: "User 1",
      result: "lose",
      date: "Aug 30",
      time: "10:00",
    },
    {
      id: 2,
      opponent: "user2",
      fullName: "User 2",
      result: "win",
      date: "Aug 20",
      time: "11:12",
    },
    {
      id: 3,
      opponent: "user3",
      fullName: "User 3",
      result: "win",
      date: "Aug 19",
      time: "18:00",
    },
    {
      id: 4,
      opponent: "user4",
      fullName: "User 4",
      result: "lose",
      date: "Aug 15",
      time: "20:00",
    },
    {
      id: 5,
      opponent: "user5",
      fullName: "User 5",
      result: "win",
      date: "Aug 3",
      time: "15:0",
    },
    {
      id: 6,
      opponent: "user6",
      fullName: "User 6",
      result: "lose",
      date: "Aug 3",
      time: "10:00",
    },
  ],
};

const profile = {
  editInnfo: {
    id: 1,
    username: "user1",
    avatar: "/src/assets/avatar/Strong Baby.jpg",
  },
  profileInfo: {
    image: "/src/assets/avatar/Strong Baby.jpg",
    fullName: "User 1",
    username: "user1",
    level: 5,
    games: 50,
    win: 37,
    lose: 13,
    xp: 400,
    state: "online",
  },
  gameStatus: {
    leaderBoard: [
      {
        username: "user1",
      },
      {
        username: "user2",
      },
      {
        username: "user3",
      },
    ],
    win: 37,
    lose: 13,
    games: 50,
    acheivement: [],
  },
};

const frindRequest = [
  {
    id: 1,
    username: "user1",
    image: "https://picsum.photos/200/200",
    fullName: "User 1",
  },
  {
    id: 2,
    username: "user2",
    image: "https://picsum.photos/200/200",
    fullName: "User 2",
  },
  {
    id: 3,
    username: "user3",
    image: "https://picsum.photos/200/200",
    fullName: "User 3",
  },
];

const userprofile = {
  username: "anass",
  fullName: "Anass ghost",
  image: "/src/assets/avatar/Deadpool.jpg",
  level: 2,
  xp: 200,
  position: 23,
  games: 24,
  lose: 8,
  win: 16,
  state: "Online", // Online, InGame, Offline(2 Hours ago, yesterday, 2 days ago, last month, 1 year ago ...)
  friend: false,
  friendRequest: false,
  friendRequestSent: false,
  gamesHistory: [
    {
      id: 1,
      opponent: "user1",
      fullName: "User 1",
      result: "lose",
      date: "Aug 30",
      time: "10:00",
    },
    {
      id: 2,
      opponent: "user2",
      fullName: "User 2",
      result: "win",
      date: "Aug 20",
      time: "11:12",
    },
    {
      id: 3,
      opponent: "user3",
      fullName: "User 3",
      result: "win",
      date: "Aug 19",
      time: "18:00",
    },
    {
      id: 4,
      opponent: "user4",
      fullName: "User 4",
      result: "lose",
      date: "Aug 15",
      time: "20:00",
    },
    {
      id: 5,
      opponent: "user5",
      fullName: "User 5",
      result: "win",
      date: "Aug 3",
      time: "15:0",
    },
    {
      id: 6,
      opponent: "user6",
      fullName: "User 6",
      result: "lose",
      date: "Aug 3",
      time: "10:00",
    },
  ],
  acheivement: [
    {
      id: 1,
      title: "First Game",
      description: "Play your first game",
      icon: "https://picsum.photos/200/200",
      date: "Aug 30",
    },
    {
      id: 2,
      title: "First Win",
      description: "Win your first game",
      icon: "https://picsum.photos/200/200",
      date: "Aug 30",
    },
  ],
};

const games = {
  gamesHistory: [
    {
      id: 1,
      opponent: "user1",
      fullName: "User 1",
      result: "lose",
      date: "Aug 30",
      time: "10:00",
    },
    {
      id: 2,
      opponent: "user2",
      fullName: "User 2",
      result: "win",
      date: "Aug 20",
      time: "11:12",
    },
    {
      id: 3,
      opponent: "user3",
      fullName: "User 3",
      result: "win",
      date: "Aug 19",
      time: "18:00",
    },
    {
      id: 4,
      opponent: "user4",
      fullName: "User 4",
      result: "lose",
      date: "Aug 15",
      time: "20:00",
    },
    {
      id: 5,
      opponent: "user5",
      fullName: "User 5",
      result: "win",
      date: "Aug 3",
      time: "15:0",
    },
    {
      id: 6,
      opponent: "user6",
      fullName: "User 6",
      result: "lose",
      date: "Aug 3",
      time: "10:00",
    },
    {
      id: 7,
      opponent: "user7",
      fullName: "User 7",
      result: "win",
      date: "Aug 30",
      time: "10:00",
    },
    {
      id: 8,
      opponent: "user8",
      fullName: "User 8",
      result: "win",
      date: "Aug 20",
      time: "11:12",
    },
    {
      id: 9,
      opponent: "user9",
      fullName: "User 9",
      result: "lose",
      date: "Aug 19",
      time: "18:00",
    },
    {
      id: 10,
      opponent: "user10",
      fullName: "User 10",
      result: "lose",
      date: "Aug 15",
      time: "20:00",
    },
    {
      id: 11,
      opponent: "user11",
      fullName: "User 11",
      result: "win",
      date: "Aug 3",
      time: "15:00",
    },
    {
      id: 12,
      opponent: "user12",
      fullName: "User 12",
      result: "lose",
      date: "Aug 3",
      time: "10:00",
    },
  ],
};

export function fetchDataFromMockApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboard);
    }, 2000);
  });
}

export function profileData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profile);
    }, 1000);
  });
}

export function gamesData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(games);
    }, 1000);
  });
}

export function friendRequestData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(frindRequest);
    }, 1000);
  });
}

export function userProfileData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userprofile);
    }, 1000);
  });
}
