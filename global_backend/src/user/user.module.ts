import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Friendship } from '../entities/Friendship.entity';
import { GameStats } from 'src/entities/game.entity';
@Module({
    imports: [ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', '../', 'src/uploadFiles'), 
      serveRoot: '/src/uploadFiles',
      serveStaticOptions: {
        setHeaders: (res) => {
          res.setHeader('Content-Type', 'image/jpeg');
        },
      },
    }),TypeOrmModule.forFeature([ Friendship,User, GameStats])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
