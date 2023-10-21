import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  async createUser(name: string, email: string, pass: string): Promise<User> {
    const user = new User();
    user.username = name;
    user.email = email;
    user.pass = pass;
    return this.userRepository.save(user);
  }

  async findUserByUn(username: string): Promise<User> {
      console.log(await this.userRepository.findOne({where : {username: username}}));
    return  await this.userRepository.findOne({where : {username: username}});
  }

  async findUserById(id: number): Promise<User> {
    console.log(await this.userRepository.findOne({where : {id: id}}));
  return  await this.userRepository.findOne({where : {id: id}});
}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}