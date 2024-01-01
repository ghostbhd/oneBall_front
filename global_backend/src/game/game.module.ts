import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { QueueService } from './queue/queue.service';

@Module({
  providers: [GameGateway, GameService, QueueService],
})
export class GameModule {}
