import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GameHistory } from "./GameHistory.entity";
import { User } from "./user.entity";

@Entity()
export class GameStats {
    constructor() {
        this.level = 0;
        this.victories = 0;
        this.defeats = 0;
        this.xp = 0;
        this.games = 0;
    }
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable : true})
    level: number;
    @Column({nullable : true})
    games: number;
    @Column({nullable : true})
    victories: number;
    @Column({nullable : true})
    defeats: number;
    @Column({nullable : true})
    xp: number;
    @OneToOne(() => User, user => user.gameStats)
    userId: User
}
