import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { profile } from 'src/dtos/profile.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService, private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userReposite: Repository<User>
  ) { }
  async login(profile: profile) {
    // if (await this.userservice.findUserByUn(profile.username) != null) {
    if (await this.userReposite.findOne({where: {email: profile.email}}) != null) {
      const user = await this.userReposite.findOne({where: {email: profile.email}});
      console.log("======== user found =========");
      console.log("here is the return of findUserByUn----->>"
        + JSON.stringify(user))
      return (user);
    }
    console.log("======== creating new user =========");
    const user = await this.userservice.createUser(profile.username, profile.email, profile.avatar)
    return (user);
  }
  async create_jwt(profile: profile): Promise<string> {
    const user = await this.userservice.findUserByUn(profile.username)
    const payload = { name: profile.username, sub: profile.email, id: user.id };
    console.log("the plyload is==================>" + JSON.stringify(payload));;
    return (
      this.jwtService.signAsync(payload)
    );
  }
}

