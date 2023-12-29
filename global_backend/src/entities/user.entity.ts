import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { Friendship } from './Friendship.entity';
import { Chat } from './Chat.entity';
import { Message } from './Message.entity';
import { Channel_Membership } from './Channel_Membership.entity';
import { Channel_Message } from './Channel_Message.entity';
import { StringifyOptions } from 'querystring';
import { GameHistory } from './GameHistory.entity';
import { GameStats } from './game.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true})
  username: string;
  @Column()
  email: string;
  @Column({ nullable: true})
  Avatar: string;
  @Column({default: false})
  is_twofactor: boolean;
  @Column({nullable: true})
  status: string;
  @OneToMany(() => Friendship, friendship => friendship.userid2)
  friendship_reciver: Friendship[];
  @OneToMany(() => Friendship, friendship => friendship.userid1)
  friendship_sender: Friendship[];
  @OneToMany(() => Chat, chat => chat.sender)
  chatid1: Chat[];
  @OneToMany(() => Chat, chat => chat.receiver)
  chatid2: Chat[];
  @OneToMany(()=> Message, message => message.SenderUserID)
  messageid: Message[];
  @OneToMany(() => Message, message => message.ReceiverUserID)
  receivedMessages: Message[];
  @OneToMany(() => Channel_Membership, channel_members => channel_members.userid)
  channel_membershipid: Channel_Membership;
  @OneToMany(() => Channel_Message, channel_message => channel_message.SenderUserid)
  channel_messageid: Channel_Message;
  @OneToMany(() => GameHistory, Gamehistory => Gamehistory.userId)
  GameHistory: GameHistory[];
  @OneToOne(() => GameStats, Gamestats => Gamestats.userId)
  GameStats: GameStats;
  @OneToMany(() => GameHistory, Gamehistory => Gamehistory.opponent)
  opponent: GameHistory[];
  //  @OneToMany(() => Channel, channel => channel.owner)
  // ownedChannels: Channel[];
}
