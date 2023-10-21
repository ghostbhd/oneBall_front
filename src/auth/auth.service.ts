import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
// import * as bcrypt from 'bcrypt';
import { UsingJoinColumnIsNotAllowedError } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(private readonly userservice: UserService) {}
    async signup(username: string, email: string, pass: string) {
        const user = await this.userservice.findUserByUn(username)
        if (user)
            throw new UnauthorizedException();
        // const hashedPassword = await bcrypt.hash(pass, 10);
        return (this.userservice.createUser(username, email,""));
    }

    async signin(username: string, pass: string) {
        const user = await this.userservice.findUserByUn(username)
        if (!user)
        {
            console.log("======== hello =========");
            throw new UnauthorizedException();
        }
        return (user);
    }
}

