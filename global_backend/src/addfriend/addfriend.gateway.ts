import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AddfriendService } from './addfriend.service';
import { CreateAddfriendDto } from './dto/create-addfriend.dto';
import { UpdateAddfriendDto } from './dto/update-addfriend.dto';
import { Server, Socket } from 'socket.io'
import { UserService } from 'src/user/user.service';
import { jwtDecode } from "jwt-decode";

@WebSocketGateway()
export class AddfriendGateway {
  constructor(private readonly addfriendService: AddfriendService,
              private readonly userservice: UserService
  ) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    // //console.log(client);
    //console.log("------------------------||||||||||||||--------------------------------------");
    //console.log('Client connected');
    const token = client.handshake.auth.token;
    if (token == undefined)
      return ;
    // console.log(this.server);
    //console.log("token ----> " ,token)
    const userPaylod : any = jwtDecode(token)
    const user = await this.userservice.findUserByUn(userPaylod.name)
    // //console.log(user);
    await this.userservice.saveUser({ ...user, status: "Online"})
    
    const user1 = await this.userservice.findUserByUn(userPaylod.name)
    // console.log(user1);
    // console.log((userPaylod as any).id);
  }

  handleDisconnect(client: Socket) {
    //console.log('Client disconnected');
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
