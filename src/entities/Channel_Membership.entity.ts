import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";
import { Channel } from "./Channel.entity";

@Entity()
export class Channel_Membership {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user.channel_membershipid)
    userid: User;
    @ManyToOne(() => Channel, channel => channel.channel_membershipid)
    channelid: Channel;
    @Column()
    DateJoined: string;
    @Column({ default: true })
    isAdmin: boolean; // Indicates if the user is an administrator of the channel
  
    @Column({ nullable: true })
    muteExpiration: Date; // For implementing temporary mute

    @Column({ default: false })
    isBanned: boolean; // For implementing bans

    @Column({ nullable: true })
    bannedBy: number; // ID of the user who banned this member

    @Column({ nullable: true })
    mutedBy: number; // ID of the user who muted this member
}
