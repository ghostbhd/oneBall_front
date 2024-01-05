import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AddfriendService } from './addfriend.service';
import { CreateAddfriendDto } from './dto/create-addfriend.dto';
import { Server, Socket } from 'socket.io'
import { UserService } from 'src/user/user.service';
import { jwtDecode } from "jwt-decode";
import { HttpException, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ConnectedSocket } from "@nestjs/websockets"

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AddfriendGateway {
  constructor(private readonly addfriendService: AddfriendService,
              private readonly userservice: UserService,
              @InjectRepository(User)
              private readonly user: Repository<User>,
  ) {}
  @WebSocketServer()
  server: Server;

  // @UseGuards(AuthGuard('jwt'))
  async handleConnection(client: Socket) {
    // console.log(client);
    console.log("-------------------------||||||||||||||--------------------------------------");
    console.log('Client connected');
    const token = client.handshake.auth.token;
    console.log("token ----> " ,token)
    if (token == undefined)
      return ;
    const userPaylod : any = jwtDecode(token)
    const user = await this.userservice.findUserByUn(userPaylod.name)
    client.join(user.id.toString());
    const user1 =  await this.userservice.saveUser({ ...user, status: "Online", socket: client.id})
    
    const userState = {username: user1.username, state: "Online"}
    this.server.emit("ChangeState", userState);
  }

  @SubscribeMessage('deconnect')
  async Disconnect(client: Socket,  @MessageBody() username: string, @ConnectedSocket() socket : Socket) {
    console.log(socket.id)
    console.log("emiting heeere ========")
    // console.log('Client disconnected');
    const user = await this.user.findOne({where: {username: username}});
    this.server.to(user.id.toString()).emit("deconnected", "ok");
    const user1 =  await this.userservice.saveUser({ ...user, status: "Offline", socket: null})

    const userState = {username: user1.username, state: "Offline"}
    this.server.emit("ChangeState", userState);
    // console.log(client.id)
    console.log("the username -------> ", username)
    console.log(user1);
  }

  async handleDisconnect(client: Socket) {
    // console.log(client);
    console.log('Client disconnected');
  }
  @SubscribeMessage('FriendRequest')
  async create(client: Socket ,@MessageBody() createAddfriendDto: CreateAddfriendDto) {
    // console.log("======================>", client); 
    await this.addfriendService.create(createAddfriendDto);
    const user2 = await this.userservice.findUserByUn(createAddfriendDto.username2);
    const stats = await this.addfriendService.getUserStats(createAddfriendDto.username2, createAddfriendDto.username1)
    // console.log("emiiiiiting the friend request000000000000000000000000000000000 ", stats);
    this.server.to(user2.id.toString()).emit("FriendRequest", stats);
     this.server.to(user2.id.toString()).emit("Friend-Request", stats);
      this.server.to(user2.id.toString()).emit("NotificationAdd", stats);
    // if (targetClient) {
    //   // Send the message to the specific client using the client ID
    //   targetClient.emit('specificClientMessage', { message: 'Hello to specific client!' });
    // } 
    return "This action adds a new addfriend";
  }
  
  @SubscribeMessage('AcceptRequest')
  async AcceptUser(@MessageBody() createAddfriendDto: CreateAddfriendDto) {
    await this.addfriendService.AcceptUser(createAddfriendDto);
    const user = await this.userservice.findUserByUn(createAddfriendDto.username2);
    const user1 = await this.userservice.findUserByUn(createAddfriendDto.username1);
    // const stats1 = await this.addfriendService.getUserStats(createAddfriendDto.username1, createAddfriendDto.username2)
     this.server.to(user1.id.toString()).emit("Brodcast", user.username);
    const stats2 = await this.addfriendService.getUserStats(createAddfriendDto.username2, createAddfriendDto.username1)
    const stats = await this.addfriendService.getUserStats(createAddfriendDto.username1, createAddfriendDto.username2)
    // console.log("emiiiiiting the friend request000000000000000000000000000000000 ", stats);
     this.server.to(user.id.toString()).emit("FriendRequest", stats2);
     this.server.to(user1.id.toString()).emit("FriendRequest", stats);
     this.server.to(user1.id.toString()).emit("Friend-Refuse", stats);
      return "";
  }

  @SubscribeMessage('RefuseRequest')
  async RefuseUser(@MessageBody() createAddfriendDto: CreateAddfriendDto) {
    await this.addfriendService.RefuseUser(createAddfriendDto);
    const user1 = await this.userservice.findUserByUn(createAddfriendDto.username1);
    const user2 = await this.userservice.findUserByUn(createAddfriendDto.username2);
    // const stats1 = await this.addfriendService.getUserStats(createAddfriendDto.username1, createAddfriendDto.username2)
     this.server.to(user1.id.toString()).emit("Brodcast", user2.username);
    const stats2 = await this.addfriendService.getUserStats(createAddfriendDto.username2, createAddfriendDto.username1)
    const stats = await this.addfriendService.getUserStats(createAddfriendDto.username1, createAddfriendDto.username2)
    // console.log("emiiiiiting the friend request000000000000000000000000000000000 ", stats);
     this.server.to(user2.id.toString()).emit("FriendRequest", stats2);
     this.server.to(user1.id.toString()).emit("FriendRequest", stats);
     this.server.to(user2.id.toString()).emit("Friend-Refuse", stats2);
     this.server.to(user1.id.toString()).emit("Friend-Refuse", stats);
    return ""
  }
  @SubscribeMessage('Block-User')
  async BlockUser(@MessageBody() createAddfriendDto: CreateAddfriendDto) {
    
    if (createAddfriendDto.username1 === createAddfriendDto.username2)
      throw new HttpException("the user can not block himself", 401)
    const users = await this.addfriendService.Blockuser(createAddfriendDto.username1, createAddfriendDto.username2);
    this.server.to(users.user1.id.toString()).emit("Ha-Tblocka", {blocker: true,blocked: false, username: users.user2.username});
    this.server.to(users.user2.id.toString()).emit("Ha-Tblocka", {blocker: false,blocked:  true, username: users.user1.username});
  }

  @SubscribeMessage('UnBlock-User')
  async UnBlockUser(@MessageBody() createAddfriendDto: CreateAddfriendDto) {
    
    if (createAddfriendDto.username1 === createAddfriendDto.username2)
      throw new HttpException("the user can not Unblock himself", 401)
    const users = await this.addfriendService.UnBlockuser(createAddfriendDto.username1, createAddfriendDto.username2);
    this.server.to(users.user1.id.toString()).emit("Ha-Tblocka", {blocker: false,blocked: false, username: users.user2.username});
    this.server.to(users.user2.id.toString()).emit("Ha-Tblocka", {blocker: false,blocked:  false, username: users.user1.username});
  }

  @SubscribeMessage('login')
  async loging(@MessageBody() username: string) {
   
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhooooooooooooooooooo")
    const user1 = await this.userservice.findUserByUn(username);
    if (!user1)
      throw new HttpException("the user not found", 404);
    this.server.to(user1.id.toString()).emit("log");
  }
}
