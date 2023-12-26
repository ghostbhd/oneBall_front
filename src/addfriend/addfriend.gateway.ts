import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AddfriendService } from './addfriend.service';
import { CreateAddfriendDto } from './dto/create-addfriend.dto';
import { UpdateAddfriendDto } from './dto/update-addfriend.dto';
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class AddfriendGateway {
  constructor(private readonly addfriendService: AddfriendService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // console.log(client);
    console.log('Client connected');
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
  }
  @SubscribeMessage('FriendRequest')
  create(@MessageBody() createAddfriendDto: CreateAddfriendDto) {
    return this.addfriendService.create(createAddfriendDto);
  }

  @SubscribeMessage('AcceptRequest')
  AcceptUser(@MessageBody() createAddfriendDto: CreateAddfriendDto) {
    return this.addfriendService.AcceptUser(createAddfriendDto);
  }

  @SubscribeMessage('RefuseRequest')
  RefuseUser(@MessageBody() createAddfriendDto: CreateAddfriendDto) {
    return this.addfriendService.RefuseUser(createAddfriendDto);
  }

  @SubscribeMessage('findAllAddfriend')
  findAll() {
    return this.addfriendService.findAll();
  }

  @SubscribeMessage('findOneAddfriend')
  findOne(@MessageBody() id: number) {
    return this.addfriendService.findOne(id);
  }

  @SubscribeMessage('updateAddfriend')
  update(@MessageBody() updateAddfriendDto: UpdateAddfriendDto) {
    return this.addfriendService.update(updateAddfriendDto.id, updateAddfriendDto);
  }

  @SubscribeMessage('removeAddfriend')
  remove(@MessageBody() id: number) {
    return this.addfriendService.remove(id);
  }
}
