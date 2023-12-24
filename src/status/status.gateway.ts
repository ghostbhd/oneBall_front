import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { StatusService } from './status.service';

@WebSocketGateway({
  cors:{
    origin: '*',
  },
})
export class StatusGateway {
  constructor(private readonly statusService: StatusService) {}

  @SubscribeMessage('createStatus')
  create() {
    return this.statusService.create();
  }
}
