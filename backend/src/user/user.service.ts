import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { error } from 'console';
import { User } from 'src/entities/user.entity';
import { Friendship } from 'src/entities/Friendship.entity';
import { GameStats } from 'src/entities/game.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Friendship)
    private readonly friendshipRepository: Repository<Friendship>,
        @InjectRepository(GameStats)
        private readonly gameStatRepo: Repository<GameStats>
  ) {}
  

    async createUser(name: string, email: string, avatar: string): Promise<User> {
        const user = new User();
        const stat = new GameStats();
        stat.userId = user;
        user.username = name;
        user.email = email;
        user.Avatar = avatar;
        user.gameStats = stat;
        await this.gameStatRepo.save(stat);
    return this.userRepository.save(user);
  }
  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
  async findUserByUn(username: string): Promise<User | undefined> {
    // console.log("the user name is 00000>> ", username)
      // console.log(await this.userRepository.findOne({where : {username: username}}));
    return  await this.userRepository.findOne({where : {username: username}, relations: ['friendship_sender', 'friendship_reciver', 'receivedMessages', 'messageid', 'blockedList', 'blockedList.BlockedUser', 'blocker', 'blocker.BlockedUser', 'Notifreciever', 'Notifreciever.userid1']});
  }

  async deleteUser(): Promise<void> {
      // await this.userRepository.clear();
 const users = await this.userRepository.find();
  await Promise.all(users.map(user => this.userRepository.remove(user)));
  }

  async findUserById(id: number): Promise<User> {
    // console.log(await this.userRepository.findOne({where : {id: id}}));
  return  await this.userRepository.findOne({where : {id: id}});
}

  async findAllUsers(): Promise<User[]> {
    const user = await this.userRepository.find({relations: ['friendship_sender.userid1', 'friendship_sender.userid2', 'friendship_reciver.userid1', 'friendship_reciver.userid2', 'blockedList', 'blockedList.BlockedUser', 'blocker', 'blocker.BlockedUser']}); 
    return user; 
  }

  async friends (userid: number) {
    const user = await this.userRepository.findOne({ where : { id: userid }, relations: ['friendship_sender', 'friendship_reciver', 'friendship_sender.userid1', 'friendship_sender.userid2', 'friendship_reciver.userid1', 'friendship_reciver.userid2']})
    if (!user)
      throw new error("the user not found");
    console.log("the friend ", user.friendship_sender)
    const friends1 = user.friendship_sender.map( (friend)  => {
      if (friend.userid1.username != user.username && friend.Status == "accepted")
        return friend.userid1
      if (friend.userid2.username != user.username && friend.Status == "accepted")
        return friend.userid2
    })
    const friends2 = user.friendship_reciver.map( (friend)  => {
      if (friend.userid1.username != user.username && friend.Status == "accepted")
        return friend.userid1
      if (friend.userid2.username != user.username && friend.Status == "accepted")
        return friend.userid2
    })
    const friends = friends1.concat(friends2);
    // console.log("the userfriends are =======> ", friends);
    return friends;
  }
}

// const fr = friend(userid: number);
// const  user = fr.find()
