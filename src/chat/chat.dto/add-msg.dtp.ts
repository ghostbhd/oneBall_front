import { IsString, IsEmail, MinLength } from 'class-validator';

export class SendMessageDto {
    @IsString()
    content: string;
  
    @IsString()
    channelId: string; // or userId if it's a direct message
}