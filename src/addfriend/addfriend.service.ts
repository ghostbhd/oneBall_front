import { HttpException, Injectable } from "@nestjs/common";
import { CreateAddfriendDto } from "./dto/create-addfriend.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Friendship } from "src/entities/Friendship.entity";
import { Equal, Repository } from "typeorm";
import { UserService } from "src/user/user.service";
import { FriendService } from "src/friend/friend.service";
import { BlockedList } from "src/entities/BlockedList.entity";
import { User } from "src/entities/user.entity";
import { Notif } from "src/entities/Notification.entity";

@Injectable()
export class AddfriendService {
  constructor(
    @InjectRepository(Notif)
    private readonly notifService: Repository<Notif>,
    @InjectRepository(BlockedList)
    private readonly blockedlist: Repository<BlockedList>,
    @InjectRepository(Friendship)
    private readonly friendShip: Repository<Friendship>,
    private readonly userservice: UserService,
    private readonly friendService: FriendService
  ) {}
  async getUserStats (username1: string, username2: string) {

  
    var friend: boolean = false;
    var friendRequest: boolean = false;
    var friendRequestSent: boolean = false;
    console.log("this is the username1", username1);
    console.log("this is the username2", username2);
    if (username2 == undefined || username1 == undefined) {
      console.log("the username is not found");
      throw new HttpException("error ", 404);
    }
    const user1 = await this.userservice.findUserByUn(username1);
    const user2 = await this.userservice.findUserByUn(username2);
    if (user2 == null || user1 == null)
      throw new HttpException("the user not found", 404);
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
    console.log("this is the friend reciver",  user1.friendship_reciver.find(() => friendU))
    // const obj = {username: user1.username, image: user1.Avatar, fullName: user1.username}
      return ({username: user2.username, image: user2.Avatar, fullName: user2.username, friend, friendRequest, friendRequestSent})
  }
  async create(createAddfriendDto: CreateAddfriendDto) {
    console.log("the username is ", createAddfriendDto.username1);
    const username1 = await this.userservice.findUserByUn(
      createAddfriendDto.username1
    );
    const username2 = await this.userservice.findUserByUn(
      createAddfriendDto.username2
    );
    if (!username2 || !username1 || username1.username == username2.username)
      throw new HttpException("the user is not found", 404);
    const frship = await this.friendShip.findOne({
      where: {
        userid1: [username1, username2],
        userid2: [username1, username2],
      },
      relations: ["userid1", "userid2"],
    });
    if (frship && (frship.Status == "friend" || frship.Status == "pending"))
      throw new HttpException("this user is already your friend", 401);
    const friend = new Friendship();
    friend.userid1 = username2;
    friend.userid2 = username1;
    friend.Status = "pending";
    const date = new Date();
    friend.DateAdded =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      ":" +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0");
    const entity = await this.friendShip.save(friend);
    console.log(entity);
    const user1 = await this.friendShip.find({
      where: { userid1: username2 },
      relations: ["userid1", "userid2"],
    });
    const user2 = await this.friendShip.find({ where: { userid2: username1 } });
    if (!user1 || !user2)
      throw new HttpException("the user is not found", 404);
      const notif = new Notif();
      notif.userid1 = username1; 
      notif.userid2 = username2; 
      notif.type = "friend";
    const no = await this.notifService.save(notif);
    console.log("the notifacation is -------> ", no);
    return "This action adds a new addfriend";
  }
  async AcceptUser(accepted_friend: CreateAddfriendDto) {
    const username1 = await this.userservice.findUserByUn(
      accepted_friend.username1
    );
    const username2 = await this.userservice.findUserByUn(
      accepted_friend.username2
    );
    if (!username1 || !username2) throw new HttpException("the not found", 404);
    const userfriend = await this.friendShip.findOne({
      where: { userid1: username1, userid2: username2 },
      relations: ["userid1"],
    });
    console.log("this the usenamer ===> ", userfriend.userid1.username);
    const notif = await this.notifService.findOne({where: [{userid1: username1, userid2: username2}, {userid2: username1, userid1: username2} ]})
    const noti = await this.notifService.remove(notif);
    const us1 = { ...userfriend, Status: "accepted" };
    const u = await this.friendShip.save(us1);
    // console.log("the friend is accepted ==============> ", u);
  }

  async RefuseUser(accepted_friend: CreateAddfriendDto) {
    const username1 = await this.userservice.findUserByUn(
      accepted_friend.username1
    );
    const username2 = await this.userservice.findUserByUn(
      accepted_friend.username2
    );
    console.log("waahaaaaaa l user1 ", username1,
                "jwahhhhhhhhhaaaaal user1 ", username2)
    if (!username1 || !username2) throw new HttpException("the not found", 404);
    const userfriend = await this.friendShip.findOne({
      where: [{userid1: username1, userid2: username2}, {userid2: username1, userid1: username2} ],
      relations: ['userid1', 'userid2']
    });
    // console.log("this the usenamer ===> ", userfriend.userid1.username);
    // const us1 = { ...userfriend,  Status: "accepted"}
    console.log("the friend is Refused ==============> ", userfriend);
    const notif = await this.notifService.findOne({where: [{userid1: username1, userid2: username2}, {userid2: username1, userid1: username2} ]})
    if (notif)
      await this.notifService.remove(notif);
    const u = await this.friendShip.remove(userfriend);
    console.log("the friend is Refused ==============> ", u);
  }

  async Blockuser(username1: string, username2: string) {
    const user1 = await this.userservice.findUserByUn(username1);
    const user2 = await this.userservice.findUserByUn(username2);
    console.log("the blocked user is =====> ", user1)
    const block = user1.blockedList.some((block) => block.BlockedUser.username === username2)
    console.log("the blocked user is =====> ", block)
    if (block)
      throw new HttpException("the user is already blocked", 401)
    const friend = await this.friendShip.find({where: {userid1:[user1, user2], userid2: [user1, user2] }});
    if (friend)
    {
        console.log("removing friend--------------------------------> ", friend);
        await this.friendShip.remove(friend);
    }
      const Block = new BlockedList();
    Block.BlockedUser = user2;
    Block.Blocker = user1;
    // user1.blockedList.push(Block);
    await this.blockedlist.save(Block);
    console.log("the blocked user is =====> ", user1)
    return {user1, user2};
  }

  async UnBlockuser(username1: string, username2: string) {
    const user1 = await this.userservice.findUserByUn(username1);
    const user2 = await this.userservice.findUserByUn(username2);
    console.log("the username of the blocker ", username1, "this is the username of the clocked ", username2)
    if (!user1 || !user2)
      throw new HttpException("the user not found", 404)
    const block = await this.blockedlist.findOne({where: {Blocker: user1, BlockedUser: user2}})
    if (!block)
      throw new HttpException("the user is not blocked", 401)
    console.log("the blocked user is =====> ", block)
    await this.blockedlist.remove(block);
    return {user1, user2};
  }

  async getNotifications(username: string) {
    console.log("thhhhhhhe username ", username)
    const user = await this.userservice.findUserByUn(username);
    console.log("the user name ", user)
    if (!user)
      throw new HttpException("the user not found", 404);
    if (user.Notifreciever.length != 0)
      return user;
    else
      null;
  }


  async friendObject(userid1: number, userid2: number) {

    const friends = await this.userservice.friends(userid1);
    const obj1 = friends.map((element) => {
      return{
            username: element.username,
            image: element.Avatar
      }
    })
    var obj2: any;
    if (userid2 != null)
     {
      const friends2 = await this.userservice.friends(userid2);
       obj2 = friends2.map((element) => {
      return{
            username: element.username,
            image: element.Avatar
      }
      })
     }
    return({obj1, obj2})
    }


}
