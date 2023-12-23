import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  create() {
    return 'This action adds a new status';
  }
}
