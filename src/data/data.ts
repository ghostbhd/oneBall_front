import { UserService } from "src/user/user.service"
import { HttpException, Injectable } from "@nestjs/common"
import { FriendService } from "src/friend/friend.service";

@Injectable()
export class Dataprofile {
  constructor (
    private readonly friendService: FriendService,
    private readonly userService: UserService)
  {}

  async getUserprofile (username1: string, username2: string) {
    
    var friend: boolean = false;
    var friendRequest: boolean = false;
    var friendRequestSent: boolean = false;
    if (username2 == undefined || username1 == undefined)
      throw new HttpException("error ", 404)
    console.log("the usernames ", username1, "the second username ", username2)
    const user1 = await this.userService.findUserByUn(username1);
    const user2 = await this.userService.findUserByUn(username2);
    console.log("the usernames ", user1)
    console.log("the second username ", user2)
    if (user2 == null || user1 == null)
      throw new HttpException("the user not found", 404);
    const friendU = await this.friendService.findOne(username1)
    console.log("000000000000000000000>>>>>>>>>>>>>>>>>>> ", friendU)
    if (friendU && friendU.Status === "accepted")
      friend = true;
    else if (friendU && friendU.Status === "pending", user1.friendship_sender.find(() => friendU))
      friendRequest = true;
    else if (friendU && friendU.Status === "pending", user1.friendship_reciver.find(() => friendU))
      friendRequestSent = true;
    console.log("is it friend =======> ", friend, "is it friend request=====> ", friendRequest,
      "is it friendRequestSent=====> ", friendRequestSent);
    const profileUser = {
       username: user2.username,
       fullName: user2.username,
       image: user2.Avatar,
       friend: friend,
       friendRequest: friendRequest,
       friendRequestSent: friendRequestSent,
    }
    return ("")
  }




  async getInfoprofile (username: string) {
    const user = await this.userService.findUserByUn(username);
    console.log("his this the user===>" + JSON.stringify(user));
    return ({editInnfo: {
        id: user.id,
        username: user.username,
        avatar: user.Avatar,
    },
    profileInfo: {
        image: user.Avatar,
        fullName: user.username,
        username: user.username,
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
    });
  }
}
@Injectable()
export class DatadaShboard  {
 constructor (private readonly userService: UserService)
  {}
  async getInfodashboard (username: string) {
      
    const user = await this.userService.findUserByUn(username);
    if (user == null)
        throw new HttpException("the user not found", 404);
    console.log("username is +=", username);
    console.log("his this the user===>" + JSON.stringify(user));
    return ({
      user: {
            id: user.id,
            username: user.username,
            image: user.Avatar,
            status: 'online',
            fullName: user.username,
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
                lastMessage: 'Hello from back-end',
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
      });
    }
};
