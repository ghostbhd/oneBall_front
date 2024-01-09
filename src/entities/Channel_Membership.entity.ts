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
    @Column({ default: false })
    isAdmin: boolean; 

    @Column({ default: false })
    isMember: boolean; 

    @Column({ default: false })
    isOwner: boolean; 
    
    @Column({ nullable: true })
    muteExpiration: Date; 

    @Column({ default: false })
    isBanned: boolean;

    @Column({ default: false })
    ismuted: boolean;

    @Column({ nullable: true })
    bannedID: number;

    @Column({ nullable: true })
    mutedID: number; 
}
