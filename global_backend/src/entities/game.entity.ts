import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GameHistory } from "./GameHistory.entity";
import { User } from "./user.entity";

@Entity()
export class GameStats {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  level: number;
  @Column()
  games: number;
  @Column()
  victories: number;
  @Column()
  defeats: number;
  @Column()
  xp: number;
  @OneToOne(() => User, user => user.GameStats)
  userId : User
}
