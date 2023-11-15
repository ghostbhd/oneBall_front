// mockData.js
export const mockChats = [
  { id: 1, name: 'hajar', message: 'Hi there!', time: '10:21 AM', avatar: 'https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg',status: 'online', },
  { id: 2, name: 'Mammy', message: 'How about you ?, can i call u tonight', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' ,status: 'online',},
  { id: 3, name: 'sis', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/f9/05/84/f905842672888a26019ef9da5ddacad6.jpg' ,status: 'offline',},
  { id: 4, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg',status: 'inGame', },
  { id: 5, name: 'user', message: 'How about you ?, can i call u tonight', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  { id: 6, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  { id: 7, name: 'user', message: 'How about you ?, can i call u tonight', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  { id: 8, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  { id: 9, name: 'hajar', message: 'Hi there!', time: '10:21 AM', avatar: 'https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg' },
  { id: 10, name: 'Mammy', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  { id: 11, name: 'sis', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/f9/05/84/f905842672888a26019ef9da5ddacad6.jpg' },
  { id: 12, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  { id: 13, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  { id: 14, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  { id: 15, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  // { id: 8, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' },
  
];

//sender is the user and the receiver is the other user (l3aks dyal lbackend)

export const mockMessages = [
  { id: 1, text: 'Hi there!', time: '9:38 AM', senderId: 1, receiverId: 2, chatId: 1 ,avatar: 'https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg' },
  { id: 2, text: 'How about you ?, can i call u tonight', time: '9:40 AM', senderId: 2, receiverId: 1, chatId: 1 },
  { id: 1, text: 'Hi there!', time: '9:38 AM', senderId: 1, receiverId: 2, chatId: 1 },
  { id: 2, text: 'How are you? ', time: '9:40 AM', senderId: 2, receiverId: 1, chatId: 1 },
  // { id: 3, text: 'I am fine,jjjjjjjjjjjjjjjhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjj thanks!', time: '9:42 AM', senderId: 1, receiverId: 2, chatId: 1 },
  { id: 4, text: 'How about you ?, can i call u tonight ', time: '9:44 AM', senderId: 1, receiverId: 2, chatId: 1 },
  
  { id: 5, text: 'I am fine too, thanks!', time: '9:46 AM', senderId: 2, receiverId: 1, chatId: 1 },
  
  { id: 6, text: 'Bye!', time: '9:48 AM', senderId: 2, receiverId: 1, chatId: 1 },

  { id: 7, text: 'whatsap!', time: '9:48 AM', senderId: 2, receiverId: 1, chatId: 2 },
  { id: 8, text: 'how are u!', time: '9:48 AM', senderId: 1, receiverId: 2, chatId: 2 },
  // { id: 9, text: 'whatsap!', time: '9:48 AM', senderId: 4, receiverId: 3, chatId: 3 },
  // { id: 10, text: 'whatsap!', time: '9:48 AM', senderId: 5, receiverId: 6, chatId: 4 },
  // { id: 11, text: 'whatsap!', time: '9:48 AM', senderId: 6, receiverId: 5, chatId: 5 },
    // Add more messages with different chatId values to simulate different chats
];


// The ID of the current user, for demonstration purposes
const CURRENT_USER_ID = 1;



