import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/User/user.service';
import { SendMessageDto } from './chat.dto/add-msg.dtp';
// import { CreateUserDto } from '../DTOS/create-user.dto';
import { Repository } from 'typeorm';
import { Chat } from 'src/entities/Chat.entity';
import { Channel} from 'src/entities/Channel.entity';
import { Channel_Membership} from 'src/entities/Channel_Membership.entity';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private readonly directMessageRepository: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Channel_Membership)
    private readonly Channel_MembershipRepository: Repository<Channel_Membership>,
) {}
    

  create(createChatDto: SendMessageDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }


  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
