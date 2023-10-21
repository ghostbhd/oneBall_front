import { User } from "./user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User,(user) => user.friendship_reciver)
    userid1: User;
    @ManyToOne(() => User,(user) => user.friendship_sender)
    userid2: User;
    @Column()
    Status: string;
    @Column()
    DateAdded: string;
}
