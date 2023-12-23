import { User } from "./user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User,(user) => user.friendship_sender)
    userid1: User;
    @ManyToOne(() => User,(user) => user.friendship_reciver)
    userid2: User;
    @Column({nullable: true})
    Status: string;
    @Column({nullable: true})
    DateAdded: string;
}
