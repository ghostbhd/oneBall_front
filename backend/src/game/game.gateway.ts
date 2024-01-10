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
import { resolve } from 'path';
import { Notif } from 'src/entities/Notification.entity';

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})

export class GameGateway {
    constructor(private readonly gameService: GameService, private queue: QueueService,
        @InjectRepository(User) private UserRepo: Repository<User>,
        @InjectRepository(Notif) private notifRepo: Repository<Notif>) {
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

    @WebSocketServer() server: Server;

    @SubscribeMessage('thala')
    async hayd(@MessageBody("id") id: number, @ConnectedSocket() client: Socket) {
        await this.queue.mutex
        this.queue.mutex = new Promise(resolve => {
            try {
                console.log("thala ==> quitter is ", id)
                console.log("before =>")
                this.queue.players.forEach(p => console.log(p.id))
                let quitter: number = this.queue.players.findIndex((player) => player.id === id)
                if (quitter !== -1) {
                    console.log("splicing index ==> ", quitter, this.queue.players[quitter].id)
                    this.queue.players.splice(quitter, 1)
                }
                console.log("after =>")
                this.queue.players.forEach(p => console.log(p.id))
            } catch (e) {
                return ("ERROR")
            }
            resolve(0)
        })
    }

    @SubscribeMessage('lija_bsmlah')
    async push_or_match(@MessageBody("playerID") id: number, @ConnectedSocket() socket: Socket) {
        //lock
        await this.queue.mutex
        this.queue.mutex = new Promise(resolve => {
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
            resolve(0)
        })
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

    @SubscribeMessage('iquit')
    async iquit(@MessageBody("id") id: number, @ConnectedSocket() client: Socket) {
        console.log("======quitter here =============", id)
        let winner: number;
        let n: number = this.queue.games.findIndex(e => {
            console.log("checking ", e.left_plr.Player.id, " ", e.right_plr.Player.id)
            if (e.right_plr.Player.id === id) {
                winner = e.left_plr.Player.id;
                return true
            }
            if (e.left_plr.Player.id === id) {
                winner = e.right_plr.Player.id
                return (true)
            }
            return false
        })
        if (n !== -1) {
            console.log("removing here accessing n=", n)
            this.server.to(this.queue.games[n].state.roomid).emit("salat",winner)
            this.gameService.salat(this.queue.games[n], winner, this.server)
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

            let op: Player
            await this.queue.p_mutex
            this.queue.p_mutex = new Promise(resolved => {
                let index = this.queue.pv_players.findIndex(e => e.id === invited.id)
                if (index === -1)
                    return ("ERROR: Opponent isn't available'")

                op = this.queue.pv_players[index]
                this.queue.pv_players.splice(index, 1)
                resolve()
            })

            let joiner: Player = { id: id, ConsecutiveLatencies: 0, socket: client };
            let room_id: string = id.toString() + op.id;

            this.queue.pv_rooms.push({ waiter: invited.id, joiner: inviter.id })
            this.server.to(inviter.id.toString()).emit("Notif")
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

            let arr = this.queue.mymap.get(inviter.id)
            if (arr === undefined)
                return ("Unavailable")
            let index = arr.findIndex(e => e === id)
            if (index !== -1) {
                let invited_pl: Player = { id: id, socket: client, ConsecutiveLatencies: 0 }
                this.queue.pv_players.push(invited_pl);
                let not: Notif = new Notif;
                not.type = "game";
                not.userid1 = inviter;
                not.userid2 = invited;
                await this.notifRepo.save(not);
                this.server.to(inviter.id.toString()).emit("Notif")

                //removing the main invitation
                this.queue.mymap[inviter.id].splice(index, 1)

                //removing the mutual invitation
                arr = this.queue.mymap[invited.id]
                index = arr.findIndex(e => e === inviter.id)
                if (index !== -1)
                    arr.splice(index, 1)
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
            let invited: User;
            let inviter: User;
            let res = await this.myfindusers(invited, inviter, opName, id);
            if (res !== "mzyaan")
                return (res)
            await this.queue.p_mutex
            this.queue.p_mutex = new Promise(resolve => {
                if (this.queue.mymap[id].findIndex(e => e === invited.id) === -1) {
                    this.queue.mymap[id].push(invited.id);
                    this.server.to(invited.id.toString()).emit("Notif") // adding the information
                }
                resolve(0);
            })
            let not: Notif = new Notif;
            not.type = "game";
            not.userid1 = inviter;
            not.userid2 = invited;
            await this.notifRepo.save(not);
        } catch (error) {
            console.log("aach haaadaa ", error)
            return ("ERROR")
        }
    }
}
