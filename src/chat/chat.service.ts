import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/User/user.service';
import { SendMessageDto } from './dto/add-msg.dtp';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateUserDto } from '../DTOS/create-user.dto';
import { Repository } from 'typeorm';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
) {}
  async sendMessage(user: User, content: string): Promise<Message> {
    // Here, the logic to store the message in the database would go.
    const message = new Message();
    message.Content= content;
    message.SenderUserID = user;
    return await this.messageRepository.save(message);
}

  create(createChatDto: SendMessageDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
