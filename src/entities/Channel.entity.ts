import { Column, Entity, OneToMany, ManyToOne,PrimaryGeneratedColumn } from "typeorm"
import { Channel_Membership } from "./Channel_Membership.entity";
import { Channel_Message } from "./Channel_Message.entity";
import { User } from "./user.entity";


@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()//{unique: true}
    Channel: string;
    @Column({ default: false })
    public: boolean;
    @Column({ default: false })
    private: boolean;
    @Column({ default: false })
    protected: boolean;
    @Column({ nullable: true })
    password: string;
    @OneToMany(() => Channel_Membership, channel_membership => channel_membership.channelid)
    channel_membershipid: Channel_Membership;
    @OneToMany(() => Channel_Message, channel_message => channel_message.channelid)
    Channel_messageid: Channel_Message;
    @ManyToOne(() => User)
    owner: User;

}

