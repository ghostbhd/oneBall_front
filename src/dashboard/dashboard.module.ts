import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
