const data = {
    user: {
        id: 1,
        username: 'user1',
        image: '/src/assets/Strong Baby.jpg',
        status: 'online',
        fullName: 'User 1',
        level: 5.4,
        games: 50,
        win: 37,
        lose: 13,
    },
    last4Msg : [
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
            username: 'user1',
            fullName: 'User 1',
            result : 'win',
            date: 'Aug 30',
            time: '10:00',
        },
        {
            id: 2,
            username: 'user2',
            fullName: 'User 2',
            result : 'lose',
            date: 'Aug 20',
            time: '11:12',
        },
        {
            id: 3,
            username: 'user3',
            fullName: 'User 3',
            result : 'win',
            date: 'Aug 19',
            time: '18:00',
        },
        {
            id: 4,
            username: 'user4',
            fullName: 'User 4',
            result : 'lose',
            date: 'Aug 15',
            time: '20:00',
        },
        {
            id: 5,
            username: 'user5',
            fullName: 'User 5',
            result : 'win',
            date: 'Aug 3',
            time: '15:0',
        },
        {
            id: 6,
            username: 'user6',
            fullName: 'User 6',
            result : 'lose',
            date: 'Aug 3',
            time: '10:00',
        },
    ],
};

export function fetchDataFromMockApi() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}