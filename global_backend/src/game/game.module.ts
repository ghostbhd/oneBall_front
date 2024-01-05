import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { QueueService } from './queue/queue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { GameHistory } from 'src/entities/GameHistory.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, GameHistory]), UserModule],
    providers: [GameGateway, GameService, QueueService]
})
export class GameModule { }
