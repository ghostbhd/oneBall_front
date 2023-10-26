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
    ]
};

export function fetchDataFromMockApi() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}