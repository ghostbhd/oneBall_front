import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Notif {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string
  @ManyToOne(() => User, user => user.Notifsender)
  userid1: User;
  @ManyToOne(() => User, user => user.Notifreciever)
  userid2: User;
}
