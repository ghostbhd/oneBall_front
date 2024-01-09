import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as speakeasy from "speakeasy";
import * as QRCode from 'qrcode'

@Injectable()
export class TfaService {
  constructor(
        private readonly userService: UserService
  ){}


  async create(username: string) 
  {
        console.log("------------------------ Hereeeeee --------------------------------------");
        console.log('Received username:', username);
        const user = await this.userService.findUserByUn(username);
        const secret = speakeasy.generateSecret();
        const imgPromise = new Promise<string>((resolve, reject) => {
          QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
              reject(err);
            } else {
              resolve('<img src="' + data_url + '">');
            }
          });
        });
        const img = await imgPromise; //Wait for the QR code generation to complete
        await this.userService.saveUser({ ...user, secret: secret.ascii });
        return img;
  }


  async validate(username: string, pass: string) 
  {

      console.log('******* Entering validate function *******');
      const user = await this.userService.findUserByUn(username);
      console.log('Found user:', user);
      console.log('Token for verification:', pass);
      console.log('User\'s secret key:', user.secret);

      const verify = speakeasy.totp.verify
      (
        {
          secret: user.secret, 
          encoding: 'ascii',   
          token: pass,          
          window: 1,// Allowing for a time window to account for time drift
          step: 30 // Time step (seconds) - should match the time step used when generating the QR code
        }
      );

      console.log('Verification result:', verify);
      if (!verify) {
        console.log('Verification failed. Throwing HttpException.');
        throw new HttpException('the value is wrong', 401);
      }
      const UpdatedUser = await this.userService.saveUser({ ...user, is_twofactor: true });//
      console.log('User data updated successfully.');
      console.log('Returning user:', UpdatedUser);
      return UpdatedUser;
  }



  async disable (username: string) 
  {
      const user = await this.userService.findUserByUn(username);
      console.log("2fa====> ",user.is_twofactor );
      if (user != null && user.is_twofactor == true) {

        const usersave = await this.userService.saveUser({...user, is_twofactor: false})
        return usersave;
      }
      else
        throw new HttpException("the 2fa is already disabled", 401);
  }


  async get2FAStatus(username: string) 
  {
    const user = await this.userService.findUserByUn(username);
    return { is_twofactor: user?.is_twofactor || false };
  }

}
