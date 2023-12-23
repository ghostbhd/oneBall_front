import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Chat } from "./Chat.entity";
import { User } from "./user.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Chat, chat => chat.messageid)
    chatid: Chat;
    @ManyToOne(()=> User, user => user.messageid)
    SenderUserID: User;
    @ManyToOne(() => User, user => user.receivedMessages)
    ReceiverUserID: User;
    @Column()
    Content: string;
    @Column()
    Timestamp: string;
    
}
