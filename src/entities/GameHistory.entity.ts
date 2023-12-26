import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class GameHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, user => user.opponent)
  opponent: User
  @Column()
  result: string 
  @Column()
  date: string
  @Column()
  time: string
  @ManyToOne(() => User, user => user.GameHistory)
  userId : User;
}

