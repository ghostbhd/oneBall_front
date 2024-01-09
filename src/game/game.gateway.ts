import {
    WebSocketGateway, SubscribeMessage,
    MessageBody, WebSocketServer, ConnectedSocket
} from '@nestjs/websockets'
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Client } from 'socket.io/dist/client';
import { Socket, Server } from 'socket.io';
import { GameObj } from './game.obj';
import { EntitySchemaEmbeddedColumnOptions } from 'typeorm';
import { QueueService } from './queue/queue.service';
import type { Player } from './queue/queue.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})

export class GameGateway {
    constructor(private readonly gameService: GameService, private queue: QueueService,
        @InjectRepository(User) private UserRepo: Repository<User>) {
    }

    check(games: GameObj[], playerID: number): boolean {
        let res = games.find(game => {
            if (game.left_plr.Player.id === playerID || game.right_plr.Player.id === playerID)
                return (true)
            return false
        })
        if (res === undefined)
            return (false)
        return true
    }

    @WebSocketServer() server: Server;


    @SubscribeMessage('lija_bsmlah')
    async push_or_match(@MessageBody("playerID") id: number, @ConnectedSocket() socket: Socket) {
        //consider using a mutex implementation here
        try {
            let to_push: Player
            let room_id = ""
            let game_index: number

            this.queue.players.forEach((e) => console.log(e.id))
            console.log("ha wahd====token =", id)
            console.log("id==", socket.id)
            if (this.queue.players.find((player) => player.id === id) === undefined &&
                this.check(this.queue.games, id) === false &&
                this.queue.pv_players.find(e => e.id === id) === undefined
            ) {
                if (this.queue.players.length + 1 < 2) {

                    console.log("\n\n------pushing into the players ===>\n")
                    to_push = {
                        id: id,
                        socket: socket,
                        ConsecutiveLatencies: 0,
                    }
                    this.queue.players.push(to_push)
                    console.log("pushing player ====", id)
                    console.log("\n\n------end of pushing ===>\n")
                }
                else {
                    console.log("\n\n------------match\n\n")
                    room_id = this.queue.players[0].id.toString() + id.toString()
                    this.queue.players[0].socket.join(room_id)

                    console.log("matching ", this.queue.players[0].id, id, " to =>", room_id)
                    this.queue.players.forEach((e) => console.log("before waah wal7maa9 =", e.id))

                    this.queue.games.push(new GameObj(this.queue.players[0], { id: id, socket: socket, ConsecutiveLatencies: 0 }, room_id, "r"))
                    this.queue.games_size++
                    this.queue.players.splice(0, 1)
                    console.log("lentgh after slicing", this.queue.players.length)
                    this.queue.players.forEach((e) => console.log("waah wal7maa9 =", e.id))
                    socket.join(room_id)

                    console.log("accessing with ", this.queue.games_size)
                    this.server.in(room_id).emit('get:right_plr:y', this.queue.games[this.queue.games_size].right_plr.y)
                    this.server.in(room_id).emit('get:left_plr:y', this.queue.games[this.queue.games_size].left_plr.y)

                    game_index = this.queue.games.findIndex(game => game.state.roomid === room_id)
                    if (game_index == -1)
                        throw ("aaach haad lmlawi")
                    console.log("the players before the size ==>", this.queue.players.length, this.queue.players.forEach(element => console.log(element.id)))
                    console.log("\n\nendof------------match\n\n")

                    this.gameService.Ball_Logic(this.server, this.queue.games[game_index])
                    //handle in the gameservice ack from both clients that they're ready
                    //handle out of game
                    //handle disconnections
                    //handle lag
                    /*
                    socket.on("disconnect", () => {
                        const indexOfBanana = this.queue.players.findIndex(fruit => fruit.id === id);
                        if (indexOfBanana !== -1) {
                            this.queue.players.slice(indexOfBanana, 1);
                        }
                        console.log(`disconnect:`, id);
                    });
                        */
                }
            }
            else {
                if (this.queue.players.find((player) => player.id === id) !== undefined)
                    console.log("already here ====")
            }
        }
        catch (hh) {
            console.log('veery bad!!')
            console.log(hh)
        }
    }

    @SubscribeMessage('post:right_plr:y')
    async trans_right(@MessageBody("playerID") id: number, @MessageBody("data") data: number, @ConnectedSocket() socket: Socket) {
        let index: number = this.queue.games.findIndex(game => game.right_plr.Player.id === id)
        //console.log("post:right_plr:y before and index =", index)
        //console.log("games lentgh ", this.queue.games.length)
        if (index !== -1) {
            if (this.queue.games[index].state.launched === true) {
                this.queue.games[index].right_plr.y = data // maybe validate the speed of the mvm
                this.queue.games[index].left_plr.Player.socket.emit('get:right_plr:y', this.queue.games[index].right_plr.y)
                //console.log("post:right_plr:y")
            }
        }
    }

    @SubscribeMessage('post:left_plr:y')
    async trans_left(@MessageBody("playerID") id: number, @MessageBody("data") data: number, @ConnectedSocket() socket: Socket) {
        let index: number = this.queue.games.findIndex(game => game.left_plr.Player.id === id)
        //console.log("post:left_plr:y before and number == ", index)
        //console.log("games lentgh ", this.queue.games.length)
        if (index !== -1) {
            if (this.queue.games[index].state.launched === true) {
                this.queue.games[index].left_plr.y = data // maybe validate the speed of the mvm
                this.queue.games[index].right_plr.Player.socket.emit('get:left_plr:y', this.queue.games[index].left_plr.y)
                //console.log("post:left_plr_plr:y")
            }
        }
    }

    async myfindusers(byUser: User, byId: User, User: string, id: number): Promise<string> {
        try {
            if (this.check(this.queue.games, id) === true)
                return ("ERROR: please finish your current game")

            byUser = await this.UserRepo.findOne({ where: { username: User } })
            if (byUser === undefined)
                throw ("wiii")
            byId = await this.UserRepo.findOne({ where: { id: id } })
            if (byId === undefined)
                throw ("wiii")
            return ("mzyaan")
        }
        catch (e) {
            console.log("aach haaadaa ", e)
            return ("ERROR")
        }
    }

    @SubscribeMessage('readytojoin:flan')
    async friendgame(client: Socket, id: number, opName: string) {
        //in frontend redirect to waiting and only then emit this
        try {
            let invited: User;
            let inviter: User;
            let res = await this.myfindusers(invited, inviter, opName, id);
            if (res !== "mzyaan")
                return (res)

            let op: Player = this.queue.pv_players.find(e => e.id === invited.id)
            if (op === undefined)
                return ("ERROR: Opponent isn't available'")

            let joiner: Player = { id: id, ConsecutiveLatencies: 0, socket: client };
            let room_id: string = id.toString() + op.id;
            this.gameService.Ball_Logic(this.server, new GameObj(joiner, op, room_id, "p"))
        }
        catch (e) {
            console.log("aach haaadaa ", e)
            return ("ERROR")
        }
    }

    @SubscribeMessage('accept:flan')
    async acceptHandler(client: Socket, id: number, opName: string) {

        try {
            let invited: User;
            let inviter: User;
            let res = await this.myfindusers(inviter, invited, opName, id);
            if (res !== "mzyaan")
                return (res)

            if (this.queue.mymap.get(inviter.id) === id) {
                let invited_pl: Player = { id: id, socket: client, ConsecutiveLatencies: 0 }
                this.queue.pv_players.push(invited_pl)
                //send notif
                //client.emit("flan:isready", invited.username)
            }
            else
                return ("get some friends")
        } catch (error) {
            console.log("aach haaadaa ", error)
        }
    }

    @SubscribeMessage('inv:flan')
    async invHandler(client: Socket, id: number, opName: string) {
        try {
            let invited : User;
            let inviter : User;
            let res = await this.myfindusers(invited, inviter, opName, id);
            if (res !== "mzyaan")
                return (res)
            this.queue.mymap[id] = invited.id
            //send notif
        } catch (error) {
            console.log("aach haaadaa ", error)
            return ("ERROR")
        }
    }
}
