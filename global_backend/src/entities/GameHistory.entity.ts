import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { GameStats } from "./game.entity";

@Entity()
export class GameHistory {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user.victories, {
        cascade: true
    })
    @JoinColumn()
    winner: User
    @ManyToOne(() => User, user => user.losses, {
        cascade: true
    })
    @JoinColumn()
    loser: User
    @Column({ nullable: true })
    date: string
    /*
        */
}
