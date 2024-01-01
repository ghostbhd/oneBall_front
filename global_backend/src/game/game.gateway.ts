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
import { find } from 'rxjs';
import { throws } from 'assert';

type PlayerQueue = {
    id: number;
    socket: Socket;
}

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})

export class GameGateway {
    constructor(private readonly gameService: GameService, private queue: QueueService) {
    }

    check(games: GameObj[], playerID: number): boolean {
        let res = games.find(game => {
            if (game.left_plr.socket === playerID || game.right_plr.socket === playerID)
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
        try {
            let to_push: PlayerQueue
            let room_id = ""
            let game_index: number

            this.queue.players.forEach((e) => console.log(e.id))
            console.log("ha wahd====token =", id)
            console.log("id==", socket.id)
            if (this.queue.players.find((player) => player.id === id) === undefined &&
                this.check(this.queue.games, id) === false) {
                if (this.queue.players.length + 1 < 2) {

                    to_push = {
                        id: id,
                        socket: socket
                    }
                    console.log("pushing into the players ===>")
                    this.queue.players.push(to_push)
                    console.log("this is the socket ", this.queue.players[0].socket)
                    console.log("pushing player ====", id)
                }
                else {
                    room_id = this.queue.players[0].id.toString() + id.toString()
                    this.queue.players[0].socket.join(room_id)
                    console.log("matching ", this.queue.players[0].id, id, " to =>", room_id)
                    this.queue.players.forEach((e) => console.log("before waah wal7maa9 =", e.id))
                    this.queue.players = this.queue.players.slice(0, 1)
                    console.log("sliced", this.queue.players[0].id, id, " to =>", room_id)
                    console.log("lentgh after slicing", this.queue.players.length)
                    this.queue.players.forEach((e) => console.log("waah wal7maa9 =", e.id))
                    socket.join(room_id)
                    this.queue.games.push(new GameObj(this.queue.players[0].id, id, room_id))
                    this.queue.games_size++

                    this.server.in(room_id).emit('get:right_plr:y', this.queue.games[this.queue.games_size].right_plr.y) // TODO only emit to the room
                    this.server.in(room_id).emit('get:left_plr:y', this.queue.games[this.queue.games_size].left_plr.y) // TODO only emit to the room

                    game_index = this.queue.games.findIndex(game => game.state.roomid === room_id)
                    if (game_index == -1)
                        throw ("aaach haad lmlawi")
                    this.gameService.Ball_Logic(this.server, this.queue.games[game_index])

                    //handle disconnections
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
                console.log("already here ====")
            }
        }
        catch (hh) {
            console.log(hh)
        }
    }

    @SubscribeMessage('post:right_plr:y')
    async trans_right(@MessageBody("playerID") id: number, @MessageBody("data") data: number, @ConnectedSocket() socket: Socket) {
        //console.log("right")
        if (this.queue.games[0].state.launched === true) {
            this.queue.games[0].right_plr.y = data
            this.server.emit('get:right_plr:y', this.queue.games[0].right_plr.y)
            //console.log("right", this.queue.games[0].right_plr.y)
        }
    }

    @SubscribeMessage('post:left_plr:y')
    async trans_left(@MessageBody("playerID") id: number, @MessageBody("data") data: number, @ConnectedSocket() socket: Socket) {
        //console.log("left")
        if (this.queue.games[0].state.launched === true) {
            this.queue.games[0].left_plr.y = data
            this.server.emit('get:left_plr:y', this.queue.games[0].left_plr.y)
            //console.log("left", this.games[0].left_plr.y)
        }
    }
}
