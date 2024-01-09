import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { fileDto } from 'src/dtos/file.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UploadService {
    constructor(private readonly userservice: UserService) {}
  async saveAvatar (olduser: string ,username: string ,file : fileDto) : Promise <User> {
    console.log("olduser ===>" + olduser)
      const user = await this.userservice.findUserByUn(olduser);
    console.log("this is the user object ==========>" + JSON.stringify(user));
    if (user != null)
    {
      var userUp: any;
      if (username != "null" && username != "")
        userUp = await this.userservice.saveUser({...user, username: username, Avatar: file.filePath});
      else
        userUp = await this.userservice.saveUser({...user, Avatar: file.filePath});
      console.log("the user is found !!!!!!!!!!", JSON.stringify(userUp));
       return(userUp);
    }
    else
      throw new NotFoundException(`User not found`);
;
  }
}
