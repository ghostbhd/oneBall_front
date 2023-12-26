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
    sender: User;

    @ManyToOne(() => User, user => user.chatid2)
    receiver: User;

    content: string;
    
    @OneToMany(() => Message, message => message.chatid)
    messageid: Message[];
}
