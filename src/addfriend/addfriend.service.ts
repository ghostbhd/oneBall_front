import { HttpException, Injectable } from '@nestjs/common';
import { CreateAddfriendDto } from './dto/create-addfriend.dto';
import { UpdateAddfriendDto } from './dto/update-addfriend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from 'src/entities/Friendship.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';
import { first } from 'rxjs';

@Injectable()
export class AddfriendService {
  constructor(
    @InjectRepository(Friendship)
    private readonly friendShip: Repository<Friendship>, 
    @InjectRepository(User)
    private readonly users: Repository<User> ,private readonly userservice: UserService) {}
  async create(createAddfriendDto: CreateAddfriendDto) {

    console.log("the username is ", createAddfriendDto.username1)
    const username1 = await this.userservice.findUserByUn(createAddfriendDto.username1) 
    const username2 = await this.userservice.findUserByUn(createAddfriendDto.username2)
    if (!username2 || !username1 || username1.username == username2.username)
      throw new HttpException("the user is not found", 404);
    const frship = await this.friendShip.findOne({where: {userid1: [username1, username2], userid2: [username1,  username2]} , relations: ['userid1', 'userid2' ] })
      if (frship && (frship.Status == "friend" || frship.Status == "pending"))
        throw new HttpException("this user is already your friend", 401);
    const friend = new Friendship();
    friend.userid1 = username1;
    friend.userid2 = username2;
    friend.Status = "pending";
    const date = new Date();
    friend.DateAdded = date.getFullYear() + '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getDate().toString().padStart(2, '0') + ':' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0');
    const entity = await this.friendShip.save(friend);
    console.log(entity);
    const user1 = await this.friendShip.findOne({where: {userid1: username1} , relations: ['userid1', 'userid2' ] })
    const username = await this.users.findOne({where: {username: createAddfriendDto.username2}, relations: ['friendship_sender', 'friendship_reciver']})
    console.log("user2.friendship_sender================== ", username.friendship_sender);
    console.log("user2.friendship_reciver================== ", username.friendship_reciver);
    const usernamee = await this.users.findOne({where: {username: createAddfriendDto.username1}, relations: ['friendship_sender', 'friendship_reciver']})
    console.log("user1.friendship_sender================== ", usernamee.friendship_sender);
    console.log("user1.friendship_reciver================== ", usernamee.friendship_reciver);
    const user2 = await this.friendShip.find({where: {userid2: username2}})
    if (!user1 || !user2)
      throw new HttpException("the user is not found", 404);
    return 'This action adds a new addfriend';
  }
  async AcceptUser(accepted_friend: CreateAddfriendDto) {
    const username1 = await this.userservice.findUserByUn(accepted_friend.username1) 
    const username2 = await this.userservice.findUserByUn(accepted_friend.username2)
    if (!username1 || !username2)
      throw new HttpException("the not found", 404);
    const userfriend = await this.friendShip.findOne({where: {userid1: username1, userid2: username2}, relations: ['userid1']})
    console.log("this the usenamer ===> ", userfriend.userid1.username)
    const us1 = { ...userfriend,  Status: "accepted"}
    const u = await this.friendShip.save(us1)
    console.log("the friend is accepted ==============> ", u);
  }
  
  async RefuseUser(accepted_friend: CreateAddfriendDto) {
    const username1 = await this.userservice.findUserByUn(accepted_friend.username1) 
    const username2 = await this.userservice.findUserByUn(accepted_friend.username2)
    if (!username1 || !username2)
      throw new HttpException("the not found", 404);
    const userfriend = await this.friendShip.findOne({where: {userid1: username1, userid2: username2}, relations: ['userid1']})
    console.log("this the usenamer ===> ", userfriend.userid1.username)
    // const us1 = { ...userfriend,  Status: "accepted"}
    const u = await this.friendShip.remove(userfriend)
    console.log("the friend is Refused ==============> ", u);
  }
  findAll() {
    return `This action returns all addfriend`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addfriend`;
  }

  update(id: number, updateAddfriendDto: UpdateAddfriendDto) {
    return `This action updates a #${id} addfriend`;
  }

  remove(id: number) {
    return `This action removes a #${id} addfriend`;
  }
}
