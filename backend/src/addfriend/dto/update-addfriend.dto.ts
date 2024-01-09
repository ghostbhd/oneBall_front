import { PartialType } from '@nestjs/mapped-types';
import { CreateAddfriendDto } from './create-addfriend.dto';

export class UpdateAddfriendDto extends PartialType(CreateAddfriendDto) {
  id: number;
}
