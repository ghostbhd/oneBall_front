import { Body, Controller, HttpException, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { Response } from 'express'
import { UserService } from "src/user/user.service";

@Controller('upload')
export class UploadController {
    constructor (private readonly userService: UserService , private readonly uploadsevice: UploadService , private readonly  authService: AuthService) {
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', { dest: './src/uploadFiles' }))
  async UploadFile (@Res({ passthrough: true }) res: Response, @Req() req: any, @Body() body : any ,@UploadedFile() file: Express.Multer.File) {
    const { username , filepath } = body;
    const usernm: string = username;
      console.log(usernm.search(" "))
    const UserChange = await this.userService.findUserByUn(username)
    if (UserChange)
      throw new HttpException("the user is already used", 401);
    if (usernm.search(" ") != -1)
      throw new HttpException("the username is not acceptable", 401)
    const user1 = await this.userService.findUserByUn(req.user.username);
    var path = null;
    var user = null;
    console.log("the file is undefined " , req.user.username);
    if (filepath)
    {
      path = filepath;
      user = await this.uploadsevice.saveAvatar(req.user.username , username, {filePath: path})
    }
    else if (file == undefined){
      console.log("the file is undefined" + user1.Avatar);
      path = user1.Avatar; 
      user = await this.uploadsevice.saveAvatar(req.user.username , username, {filePath: path})
    }
    else {
      path = file.path;
      user = await this.uploadsevice.saveAvatar(req.user.username , username, {filePath: process.env.HOST_B  + path})
    }
    console.log('Username :', username, " the username ", user.username);
    console.log(file);
    const accessToken:  string = await this.authService.create_jwt({
        email: req.user.email,
        username: user.username,//////////////// hna fin wgaft
        avatar: path
      });
    console.log("the accessToken is ", accessToken);
    // res.clearCookie('accessToken')
    // res.cookie('accessToken', accessToken);
    return ({user : user, accessToken: accessToken});
  }
}
