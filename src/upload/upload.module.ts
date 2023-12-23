import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UserModule } from 'src/user/user.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
     //ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '/uploadFiles'), 
      // serveRoot: '/uploadFiles',
    // }),
    UserModule, AuthModule],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
