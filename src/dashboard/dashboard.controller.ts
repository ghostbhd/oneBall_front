import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DatadaShboard } from 'src/data/data';

@Controller('dashboard')
export class DashboardController {
  constructor (private readonly datadashboard: DatadaShboard)
  {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get_dashboard_info (@Req() req: any) {
    console.log("ooooooo ");
    return (this.datadashboard.getInfodashboard(req.user.username));
  }
}
