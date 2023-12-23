import { Injectable } from '@nestjs/common';
import { Create2faDto } from './dto/create-2fa.dto'

@Injectable()
export class TfaService {
  create(create2faDto: Create2faDto) {
    return 'This action adds a new 2fa';
  }
}
