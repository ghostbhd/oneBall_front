import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  async createUser(name: string, email: string, avatar: string): Promise<User> {
    const user = new User();
    user.username = name;
    user.email = email;
    user.Avatar = avatar;
    return this.userRepository.save(user);
  }
  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findUserByUn(username: string): Promise<User> {
      // console.log(await this.userRepository.findOne({where : {username: username}}));
    return  await this.userRepository.findOne({where : {username: username}});
  }

  async deleteUser(): Promise<void> {
      // await this.userRepository.clear();
 const users = await this.userRepository.find();
  await Promise.all(users.map(user => this.userRepository.remove(user)));
  }

  async findUserById(id: number): Promise<User> {
    console.log(await this.userRepository.findOne({where : {id: id}}));
  return  await this.userRepository.findOne({where : {id: id}});
}

  async findAllUsers(): Promise<User[]> {
    const user = await this.userRepository.find(); 
    return user; 
  }
}
