

const dashboard = {
    user: {
        id: 1,
        username: 'user1',
        image: '/src/assets/avatar/Strong Baby.jpg',
        status: 'online',
        fullName: 'User 1',
        level: 5.4,
        games: 50,
        win: 37,
        lose: 13,
    },
    last4Msg: [
        {
            id: 1,
            username: 'user1',
            image: 'https://picsum.photos/200/200',
            lastMessage: 'Hello',
            status: 'online',
            ischannel: false
        },
        {
            id: 2,
            username: 'user2',
            image: 'https://picsum.photos/200/200',
            lastMessage: 'Hi there',
            status: 'online',
            ischannel: true,
            channelName: 'channel1'
        },
        {
            id: 3,
            username: 'user3',
            image: 'https://picsum.photos/200/200',
            lastMessage: 'How are you?',
            status: 'offline',
            ischannel: false
        },
        {
            id: 4,
            username: 'user4',
            image: 'https://picsum.photos/200/200',
            lastMessage: 'Good morning, goooooooooooooooooooooooooooooooooooooooooooooooo',
            status: 'inGame',
            ischannel: false
        }
    ],
    last6Games: [
        {
            id: 1,
            opponent: 'user1',
            fullName: 'User 1',
            result: 'lose',
            date: 'Aug 30',
            time: '10:00',
        },
        {
            id: 2,
            opponent: 'user2',
            fullName: 'User 2',
            result: 'win',
            date: 'Aug 20',
            time: '11:12',
        },
        {
            id: 3,
            opponent: 'user3',
            fullName: 'User 3',
            result: 'win',
            date: 'Aug 19',
            time: '18:00',
        },
        {
            id: 4,
            opponent: 'user4',
            fullName: 'User 4',
            result: 'lose',
            date: 'Aug 15',
            time: '20:00',
        },
        {
            id: 5,
            opponent: 'user5',
            fullName: 'User 5',
            result: 'win',
            date: 'Aug 3',
            time: '15:0',
        },
        {
            id: 6,
            opponent: 'user6',
            fullName: 'User 6',
            result: 'lose',
            date: 'Aug 3',
            time: '10:00',
        },
    ],
};

const profile = {
    editInnfo: {
        id: 1,
        username: 'user1',
        avatar: '/src/assets/avatar/Strong Baby.jpg',
    },
    profileInfo: {
        image: '/src/assets/avatar/Strong Baby.jpg',
        fullName: 'User 1',
        username: 'user1',
        level: 5,
        games: 50,
        win: 37,
        lose: 13,
        xp: 400,
        state: 'online',
    },
    gameStatus: {
        leaderBoard: [
            {
                username: 'user1'
            },
            {
                username: 'user2'
            },
            {
                username: 'user3'
            }
        ],
        win: 37,
        lose: 13,
        games: 50,
        acheivement: []
    }
}

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