import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Channel } from "./Channel.entity";
import { User } from "./user.entity";

@Entity()
export class Channel_Message {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Channel, channel => channel.Channel_messageid)
    channelid: Channel;
    @ManyToOne(() => User, user => user.channel_messageid)
    SenderUserid: User;
    @Column()
    Content: string;
    @Column()
    Timestamp: string;
}
