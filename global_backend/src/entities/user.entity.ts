import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { Friendship } from './Friendship.entity';
import { Chat } from './Chat.entity';
import { Message } from './Message.entity';
import { Channel_Membership } from './Channel_Membership.entity';
import { Channel_Message } from './Channel_Message.entity';
import { StringifyOptions } from 'querystring';
import { GameHistory } from './GameHistory.entity';
import { GameStats } from './game.entity'
import { Socket } from 'socket.io';
import { BlockedList } from './BlockedList.entity';
@Entity()
export class User {
    @OneToOne(() => GameStats, Gamestats => Gamestats.userId, {
        cascade : true
    })
    @JoinColumn()
    gameStats: GameStats;

    @OneToMany(() => GameHistory, Gamehistory => Gamehistory.winner)
    @JoinColumn()
    victories : GameHistory[];
    @OneToMany(() => GameHistory, Gamehistory => Gamehistory.loser)
    @JoinColumn()
    losses : GameHistory[];
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
  @Column({ nullable: true })
  secret: string;
  @Column({nullable: true})
  status: string;
  @Column({ nullable: true})
  socket: string;
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
  @OneToMany(() => BlockedList, (block) => block.BlockedUser)
  blockedList: BlockedList[];
  @OneToMany(() => BlockedList, (block) => block.Blocker)
  blocker: BlockedList[];
  //  @OneToMany(() => Channel, channel => channel.owner)
  // ownedChannels: Channel[];
}
