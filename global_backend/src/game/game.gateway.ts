import {
    WebSocketGateway, SubscribeMessage,
    MessageBody, WebSocketServer, ConnectedSocket
} from '@nestjs/websockets'
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Client } from 'socket.io/dist/client';
import { Socket, Server } from 'socket.io';
import { useId } from 'react';
import { GameObj } from './game.obj';
import { EntitySchemaEmbeddedColumnOptions } from 'typeorm';


@WebSocketGateway({
    cors: {
        origin: '*',
    }
})

export class GameGateway {
    constructor(private readonly gameService: GameService) {
    }

    protected n
    protected games: GameObj[] = []
    protected players: number[] = []

    @WebSocketServer() server: Server;

    @SubscribeMessage('lija_bsmlah')
    async push_or_match(client: Socket, @MessageBody("playerID") id: number, @ConnectedSocket() socket: Socket) {
        console.log("this is the player")
        this.players.forEach((e) => console.log(e))
        console.log("ha wahd====token =", id)
        console.log("id==", socket.id)
        if (this.players.find(sock => sock === id) === undefined) {
            if (this.players.length + 1 < 2) {
                this.players.push(id)
                console.log("pushing player ====", id)
                //push
                //TODO add the user to a queue and only send the start of the game when 2 players match
            }
            else {
                this.games.push(new GameObj(this.players[0], this.players[1]))
                console.log("game =>", this.games.length - 1, " added")
                let n_players: number[] = []
                this.players = n_players
                //match
                console.log("matchiiing===")
                //console.log(`connected: ${client.id}`)
                this.server.emit('get:right_plr:y', this.games[0].right_plr.y) // TODO only emit to the room
                this.server.emit('get:left_plr:y', this.games[0].left_plr.y)

                this.gameService.Ball_Logic(this.server, socket, this.games[0])

                socket.on("disconnect", () => {
                    const indexOfBanana = this.players.findIndex(fruit => fruit === id);
                    if (indexOfBanana !== -1) {
                        this.players.splice(indexOfBanana, 1);
                    }
                    console.log(`disconnect:`, id);
                });
            }
        }
        else {
            if (this.players.find(sock => sock === id) !== undefined) {
                console.log("already here ====")
            }
            else {

            }
        }
    }

    @SubscribeMessage('post:right_plr:y')
    async trans_right(client: Socket, @MessageBody("playerID") id: number, @MessageBody("data") data: number, @ConnectedSocket() socket: Socket) {
        console.log("right")
        if (this.games[0].state.launched === true) {
            this.games[0].right_plr.y = data
            this.server.emit('get:right_plr:y', this.games[0].right_plr.y)
            //console.log("right", this.games[0].right_plr.y)
        }
    }

    @SubscribeMessage('post:left_plr:y')
    async trans_left(client: Socket, @MessageBody("playerID") id: number, @MessageBody("data") data: number, @ConnectedSocket() socket: Socket) {
        console.log("left")
        if (this.games[0].state.launched === true) {
            this.games[0].left_plr.y = data
            this.server.emit('get:left_plr:y', this.games[0].left_plr.y)
            //console.log("left", this.games[0].left_plr.y)
        }
    }
}
