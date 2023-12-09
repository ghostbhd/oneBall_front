import { Module } from '@nestjs/common';
import { ProfiledataController } from './profiledata.controller';
import { ProfiledataService } from './profiledata.service';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  controllers: [ProfiledataController],
  providers: [ProfiledataService],
})
export class ProfiledataModule {}
