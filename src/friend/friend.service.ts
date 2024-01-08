import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from 'src/entities/Friendship.entity';
import { Equal, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class FriendService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Friendship)
    private readonly friendService: Repository<Friendship>
  ) {}
  create(createFriendDto: CreateFriendDto) {
    return 'This action adds a new friend';
  }

  async findAll(username: string) {
    const user = await this.userService.findUserByUn(username) 
    console.log("this is the user ", user);
    const friend = await this.friendService.find({where:{userid1: user, userid2: user}})
    console.log("this is the friendsHip ", friend);
    return friend;
  }

  async findOne(user1: User, user2: User): Promise<Friendship> {
    // const user = await this.userService.findUserByUn(username) 
    // console.log('hanaaaaaaaaaaaaaaaaaaaaaa', user1, "hanaaaaaaaaaaaaaaaaaaaaaa ", user2)
    const friend = await this.friendService.findOne({where:[{userid1: Equal(user1.id), userid2: Equal(user2.id)}, {userid1: Equal(user2.id), userid2: Equal(user1.id)}], relations: ['userid1', 'userid2']})

    // console.log("the friendship table |||||", friend)
    return friend;
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

   async remove() {
      const users = await this.friendService.find();
      await Promise.all(users.map(user => this.friendService.remove(user)));
    return ;
  }
}
