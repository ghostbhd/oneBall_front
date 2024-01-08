import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class BlockedList {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => User, (user) => user.blocker)
  Blocker: User;
  @ManyToOne(() => User, (user) => user.blockedList)
  BlockedUser: User;
}
