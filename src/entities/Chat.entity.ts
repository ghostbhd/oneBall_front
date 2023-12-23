import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";
import { Message } from "./Message.entity";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    DateStarted: string;
    @ManyToOne(() => User, user => user.chatid1)
    userid1: User;

    @ManyToOne(() => User, user => user.chatid2)
    userid2: User;
    @OneToMany(() => Message, message => message.chatid)
    messageid: Message[];
}
