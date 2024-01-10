import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Socket, Server } from 'socket.io';
import { GameObj } from './game.obj';
import { Player, QueueService } from './queue/queue.service';
import { state } from './game.obj';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { GameHistory } from 'src/entities/GameHistory.entity';
import { GameStats } from 'src/entities/game.entity';


@Injectable()
export class GameService {
    constructor(private queue: QueueService, @InjectRepository(User) private UserRepo: Repository<User>,
        @InjectRepository(GameHistory) private GameHistoryRepo: Repository<GameHistory>) {
    }
    private MAX_H: number = 1499
    private MAX_V: number = 4973
    private PLAYER_TO_MAX: number = 0.15
    private SPEED_LIMIT: number = 1000
    private MID_BALL_TO_MAX_V: number = 0.019021739 // (35 / 920)/ 2

    /*
    async laghandled_emit(event: string, data, client: Socket, inf: GameObj, io: Server) {
        client.timeout(1300).emit(event, data, (err, response) => {
            if (err) {
                if (inf.state.salat === false)
                    console.log("---<<<aaayeeeh ===>", event)
                this.salat(inf)
                let winner = inf.left_plr.Player.socket.id !== client.id ? inf.right_plr.Player.id : inf.left_plr.Player.id
                io.in(inf.state.roomid).emit("salat", winner)
            }
            else {
                console.log(response.status); // 'ok'
            }
        })
    }
    */

    timeout(ms: number, inf: GameObj, n: number): Promise<string> {
        return new Promise((resolve) => {

            if (n == 1) {
                inf.ball.v_state.resolve = resolve
                inf.ball.v_state.id = setTimeout(() => {
                    resolve("resolved")
                }, ms);
                //console.log("this is n", n, inf.ball.v_state.id)
            }
            else if (n == 0)
                setTimeout(() => {
                    resolve("resolved")
                }, ms);
            else {
                inf.ball.h_state.resolve = resolve
                inf.ball.h_state.id = setTimeout(() => {
                    resolve("resolved")
                }, ms);
            }
        })
    }

    upd_vertical_pos(inf: GameObj) {
        let dir = inf.ball.y_dir == 1 ? 1 : -1
        let dist = ((Date.now() - inf.ball.v_state.start) / inf.state.MAX_V) * dir
        //console.log("dist ", dist)
        let r = inf.ball.v_state.pos + dist
        let result: number = Math.abs(r)
        //console.log("this is r", r, "===> dist", dist, " pos ==>", inf.ball.v_state.pos)
        //console.log("to be parsed ", parseInt("2.0004"))
        //console.log("prev ", inf.ball.v_state.pos, " now ", result)
        return (result)
    }

    //TODO
    async salat(inf: GameObj, winner: number, io: Server) {
        console.log("safi ra salaaat ====>")
        if (inf.state.salat === true)
            return
        inf.state.salat = true
        if (inf.ball.v_state.id != -1) {
            clearTimeout(inf.ball.v_state.id)
            inf.ball.v_state.id = -1
            inf.ball.v_state.resolve("resolved")
        }

        if (inf.ball.h_state.id != -1) {
            clearTimeout(inf.ball.h_state.id)
            inf.ball.h_state.id = -1
            inf.ball.h_state.resolve("resolved")
        }

        let game_index: number = this.queue.games.findIndex(game => game.state.roomid === inf.state.roomid)
        if (game_index !== -1) {
            if (inf.state.type === "r") {
                console.log("before slicing the game lentght = ", this.queue.games.length)
                this.queue.games.forEach(element => {
                    console.log("and this is it = ", element.state.roomid)
                });
                this.queue.games.splice(game_index, game_index + 1)
                this.queue.games_size--
                this.queue.games.forEach(element => {
                    console.log("and this is it = ", element.state.roomid)
                });
                console.log("after slicing the game lentght = ", this.queue.games.length)
                this.queue.games.forEach(element => {
                    console.log("and this is it = ", element.state.roomid)
                });

                console.log("the players after the game ended queue ==> size ==> ", this.queue.players.length, this.queue.players.forEach(element => console.log(element.id)))
                console.log("after ended ==>")
            }
            else if (inf.state.type === "p") {
                let n: number = this.queue.pv_rooms.findIndex(e => {
                    ((e.joiner === inf.left_plr.Player.id || e.joiner === inf.right_plr.Player.id)
                        && (e.waiter === inf.left_plr.Player.id || e.waiter === inf.right_plr.Player.id))
                })
                if (n === -1)
                    console.log("reaallyyyy baaaaad")
                else {
                    console.log("before slicing the game lentght = ", this.queue.pv_rooms.length)
                    this.queue.pv_rooms.splice(n, 1)
                    console.log("the players after the game ended queue ==> size ==> ", this.queue.pv_rooms.length, this.queue.pv_rooms.forEach(element => console.log(element.waiter)))
                    console.log("after ended ==>")
                }
            }
            this.database_entries(inf.left_plr.Player, inf.right_plr.Player, winner)
        }
    }

    add_victory(user: User, luser: User) {
        if (user.gameStats.xp + 200 > 1000) {
            user.gameStats.xp = user.gameStats.xp + 200 - 1000;
            user.gameStats.level++;
        }
        user.gameStats.victories++;
        user.gameStats.xp += 200;
        user.gameStats.games++;
        luser.gameStats.games++;
        luser.gameStats.defeats++;
    }

    async database_entries(left_plr: Player, right_plr: Player, winner: number) {
        try {
            //GameHistory relations with opponent
            const game_time: string = new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString()

            console.log("\nthis is the time ==> ", new Date().toLocaleTimeString())

            console.log("left_plr ==> ", left_plr.id)
            let left_user: User = await this.UserRepo.findOne({ where: { id: left_plr.id }, relations: ["victories", "losses", "gameStats"] })
            console.log("\n\ntesting the db entries left user ==> ", left_user)
            const right_user: User = await this.UserRepo.findOne({ where: { id: right_plr.id }, relations: ["victories", "losses", "gameStats"] })
            console.log("\n\ntesting the db entries right user ==> ")
            console.log(right_user)

            const gamehistory = new GameHistory()

            gamehistory.winner = winner === 1 ? left_user : right_user
            gamehistory.loser = winner === 2 ? left_user : right_user

            this.add_victory(gamehistory.winner, gamehistory.loser)
            gamehistory.loser = winner !== 1 ? left_user : right_user
            gamehistory.date = game_time
            gamehistory.winner.status = "online"
            gamehistory.loser.status = "online"
            console.log("testing the db entries winner user ==> ")
            console.log(gamehistory.winner)

            await this.GameHistoryRepo.save(gamehistory)
            console.log("testing the victories of winner ==> ")
            left_user = await this.UserRepo.findOne({ where: { id: left_plr.id }, relations: ["victories", "losses", "gameStats"] })
            left_user.victories.forEach((e) => console.log(e))

        }
        catch (er) {
            console.log(er)
        }
    }

    async horizontal_bouncing(io: Server, inf: GameObj) {

        while (inf.state.salat as boolean === false) {

            inf.ball.h_state.start = Date.now()
            console.log("+++++horizontal await");
            const hh = await this.timeout(inf.ball.h_dur, inf, 2)

            if (inf.state.salat === true)
                break

            inf.ball.x_dir = inf.ball.x_dir == 1 ? 0 : 1
            let pl_y = inf.ball.x_dir == 1 ? inf.left_plr.y : inf.right_plr.y

            let ball_y = this.upd_vertical_pos(inf) + this.MID_BALL_TO_MAX_V

            //bounce or score a goal ==> 
            if (ball_y <= pl_y + this.PLAYER_TO_MAX && ball_y >= pl_y) {
                //cross or normal bounce ==>
                if ((inf.ball.y_dir === 1 && ball_y < pl_y + (this.PLAYER_TO_MAX / 2))
                    || ((inf.ball.y_dir === 0 && ball_y > pl_y + (this.PLAYER_TO_MAX / 2)))) {
                    //cross bounce ==>
                    //console.log("pl_y", pl_y)
                    if (inf.ball.v_state.id != -1) {
                        inf.ball.v_state.pos = this.upd_vertical_pos(inf)
                        //console.log("changed pos from horizental ==>>", inf.ball.v_state.pos)
                        inf.ball.v_state.changed = 1
                        clearTimeout(inf.ball.v_state.id)
                        inf.ball.v_state.id = -1
                        inf.ball.v_state.resolve("resolved")
                    }
                    else
                        console.log("wtf")
                }
            }
            else {
                let data: number = inf.ball.x_dir == 1 ? 2 : 1 //TOBE checked
                this.salat(inf, data, io)
                io.in(inf.state.roomid).emit("salat", data)
                break
                /*
                */
            }

            // accelarate ==>
            /* 
            if (inf.ball.h_dur - 20 <= this.SPEED_LIMIT)
                inf.ball.h_dur = this.SPEED_LIMIT
            else
                inf.ball.h_dur -= 20
            */
            inf.state.pingpongs++;

            //console.log("MAX SPEED", inf.ball.h_dur)
            io.in(inf.roomid).emit("ball:horizontal:bounce", { dir: inf.ball.x_dir, dur: inf.ball.h_dur })
            /*
            this.laghandled_emit("ball:horizontal:bounce", { dir: inf.ball.x_dir, dur: inf.ball.h_dur }, inf.left_plr.Player.socket, inf, io)
            this.laghandled_emit("ball:horizontal:bounce", { dir: inf.ball.x_dir, dur: inf.ball.h_dur }, inf.right_plr.Player.socket, inf, io)
            */
        }
    }

    async vertical_bouncing(io: Server, inf: GameObj) {

        let _dur = 0
        while (inf.state.salat as boolean === false) {
            //console.log("starting vertical_bouncing")

            inf.ball.v_state.start = Date.now()

            if (inf.ball.v_state.changed == 1) {
                //console.log("changed dur = ", _dur)
                inf.ball.v_state.changed = 0
                await this.timeout(_dur, inf, 1)
                if (inf.state.salat === true)
                    break

                inf.ball.y_dir = inf.ball.y_dir == 1 ? 0 : 1
            }
            else {
                await this.timeout(inf.ball.v_dur, inf, 1)

                if (inf.state.salat === true)
                    break

                inf.ball.y_dir = inf.ball.y_dir == 1 ? 0 : 1
            }

            if (inf.ball.v_state.changed == 1) {
                _dur = inf.ball.y_dir == 1 ? ((1 - inf.ball.v_state.pos) * inf.state.MAX_V) : inf.ball.v_state.pos * inf.state.MAX_V
                //console.log("cleared sending new _dur =", _dur,
                //"cuz pos ===>", inf.ball.v_state.pos, "ydir ==>", inf.ball.y_dir)
                io.in(inf.roomid).emit("ball:vertical:bounce", { dir: inf.ball.y_dir, dur: _dur, pos: inf.ball.v_state.pos })
            }
            else {
                inf.ball.v_state.pos = inf.ball.y_dir == 1 ? 0 : 1
                io.in(inf.roomid).emit("ball:vertical:bounce", { dir: inf.ball.y_dir, dur: inf.ball.v_dur, pos: inf.ball.v_state.pos })
            }
            //console.log("server : vertical bounce ", "=============================")
        }
    }

    async BounceLogic(io: Server, inf: GameObj) {
        this.vertical_bouncing(io, inf)
        this.horizontal_bouncing(io, inf)
    }

    async Ball_Logic(io: Server, inf: GameObj) {

        /*
        this.laghandled_emit("opponent_found", 1, inf.left_plr.Player.socket, inf, io)
        this.laghandled_emit( inf.right_plr.Player.socket, inf, io)
        //io.in(inf.state.roomid).emit("ball:first_ping", { h_dur: inf.ball.h_dur, v_dur: inf.ball.v_dur })
        */

        let LeftUser: User = await this.UserRepo.findOneBy({ id: inf.left_plr.Player.id })
        let RightUser: User = await this.UserRepo.findOneBy({ id: inf.right_plr.Player.id })
        LeftUser.status = "in game"
        RightUser.status = "in game"
        await this.UserRepo.save(LeftUser)
        await this.UserRepo.save(RightUser)

        inf.left_plr.Player.socket.emit("opponent_found", 1)
        inf.right_plr.Player.socket.emit("opponent_found", 2)

        const time_out_id = await this.timeout(4500, inf, 0)

        if (inf.state.launched == false) {
            console.log("first_ping id =", inf.state.roomid)
            io.in(inf.state.roomid).emit("ball:first_ping", { h_dur: inf.ball.h_dur, v_dur: inf.ball.v_dur })

            inf.state.launched = true

            this.BounceLogic(io, inf)
        }
    }
    create(createGameDto: CreateGameDto) {
        return 'This action adds a new game';
    }

    findAll() {
        return `This action returns all game`;
    }

    findOne(id: number) {
        return `This action returns a #${id} game`;
    }

    update(id: number, updateGameDto: UpdateGameDto) {
        return `This action updates a #${id} game`;
    }

    remove(id: number) {
        return `This action removes a #${id} game`;
    }
}
