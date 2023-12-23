import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Channel_Membership } from "./Channel_Membership.entity";
import { Channel_Message } from "./Channel_Message.entity";

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    Channel: string;
    @OneToMany(() => Channel_Membership, channel_membership => channel_membership.channelid)
    channel_membershipid: Channel_Membership;
    @OneToMany(() => Channel_Message, channel_message => channel_message.channelid)
    Channel_messageid: Channel_Message;

}
