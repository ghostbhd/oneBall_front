import { UserService } from "src/user/user.service";
import { HttpException, Injectable } from "@nestjs/common";
import { FriendService } from "src/friend/friend.service";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { BlockedList } from "src/entities/BlockedList.entity";

@Injectable()
export class Dataprofile {
  constructor(
    private readonly friendService: FriendService,
    private readonly userService: UserService,
    @InjectRepository(BlockedList)
    private readonly blockedList: Repository<BlockedList>
  ) {}

  async getUserprofile(username1: string, username2: string) {
    var friend: boolean = false;
    var friendRequest: boolean = false;
    var friendRequestSent: boolean = false;
    // console.log("this is the username1", username1);
    // console.log("this is the username2", username2);
    if (username2 == undefined || username1 == undefined) {
      console.log("the username is not found");
      throw new HttpException("error ", 404);
    }
      console.log("the username is ", username1, "the username", username2);
    const user1 = await this.userService.findUserByUn(username1);
    const user2 = await this.userService.findUserByUn(username2);
    // console.log("the user1 ", user1, "the user 2 ", user2)
    if (user2 == null || user1 == null)
     {
      console.log("the username is not found");
      throw new HttpException("the user not found", 404);
     }
    const friendU = await this.friendService.findOne(user1, user2);
    if (friendU && friendU.Status === "accepted") friend = true;
    else if (
      (friendU && friendU.Status === "pending",
      user1.friendship_sender.find(() => friendU))
    )
      friendRequest = true;
    else if (
      (friendU && friendU.Status === "pending",
      user1.friendship_reciver.find(() => friendU))
    )
      friendRequestSent = true;
    console.log(
      "is it friend =======> ",
      friend,
      "is it friend request=====> ",
      friendRequest,
      "is it friendRequestSent=====> ",
      friendRequestSent
    );
    const blockedList = await this.blockedList.findOne({where: [{Blocker : Equal(user1.id), BlockedUser: Equal(user2.id)}, {Blocker : Equal(user2.id), BlockedUser: Equal(user1.id)}]})
    var blocked : boolean = false;
    var blocker: boolean =false;
    var username: string;
    if (user1.blocker.find(() => blockedList))
    {
      console.log("the user one blocked the user two")
      blocker = true;
      username = user2.username;
    }
    else if (user2.blocker.find(() => blockedList))
    {
      console.log("the user two blocked the user one")
      blocked = true;
      username = user2.username;
    }
    const profileUser = {
      blocked: blocked,
      blocker: blocker,
      username: user2.username,
      fullName: user2.username,
      image: user2.Avatar,
      level: 2,
      xp: 200,
      position: 23,
      games: 24,
      lose: 8,
      win: 16,
      state: user2.status,
      friend: friend,
      friendRequest: friendRequest,
      friendRequestSent: friendRequestSent,
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
    };
    // console.log("this is the profile user", profileUser);
    return profileUser;
  }

  async getInfoprofile(username: string) {
    const user = await this.userService.findUserByUn(username);
    // console.log("his this the user===>" + JSON.stringify(user));
    return {
      editInnfo: {
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
  }
}

@Injectable()
export class DatadaShboard {
  constructor(private readonly userService: UserService) {}
  async get_lastMessages(user: User) {
    const Messages = user.receivedMessages.reverse();
    return Messages;
  }

  async getInfodashboard(username: string) {
    const user = await this.userService.findUserByUn(username);
    // console.log("his this the user===>" + JSON.stringify(user));
    const lastMessage = await this.get_lastMessages(user);
    // console.log(lastMessage);
    return {
      user: {
        id: user.id,
        username: user.username,
        image: user.Avatar,
        status: user.status,
        fullName: user.username,
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
          lastMessage: "lastMessage[0].Content",
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
  }
}
