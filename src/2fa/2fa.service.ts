import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as speakeasy from "speakeasy";
import * as QRCode from 'qrcode'

@Injectable()
export class TfaService {
  constructor(
        private readonly userService: UserService
  ){}
async create(username: string) {
    // try {
      console.log("------------------------ Hereeeeee --------------------------------------");
      console.log('Received username:', username);
      const user = await this.userService.findUserByUn(username);
      // console.log('Retrieved user data:', user);
      const secret = speakeasy.generateSecret();
      const imgPromise = new Promise<string>((resolve, reject) => {
        QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
          if (err) {
            reject(err);
          } else {
            // console.log("secret path", secret.otpauth_url);
            resolve('<img src="' + data_url + '">');
          }
        });
      });
      const img = await imgPromise; //Wait for the QR code generation to complete
      // console.log("Generated image:", img);
      await this.userService.saveUser({ ...user, secret: secret.ascii });
      return img;
    // } catch (error) {
    //   console.error('Error in create method:', error.message);
    //   throw error;
    // }
  }

  async validate(username: string, pass: string) {

    const user = await this.userService.findUserByUn(username)
    const verify = speakeasy.totp.verify({
      secret: user.secret,
      encoding: "ascii",
      token: pass,
    })
    if (verify == false)
      throw new HttpException("the value is wrong", 401);
    await this.userService.saveUser({ ...user, is_twofactor: true})
    return (user)
  }

  async disable (username: string) {

    const user = await this.userService.findUserByUn(username);
    if (user != null && user.is_twofactor == true) {

      const usersave = await this.userService.saveUser({...user, is_twofactor: false})
      return usersave;
    }
    else
      throw new HttpException("the 2fa is already disabled", 401);
  }
}
