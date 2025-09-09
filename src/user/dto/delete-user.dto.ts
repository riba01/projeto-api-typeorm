import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class DeleteUserDto extends PartialType(CreateUserDto) {
  name?: string;
  email?: string;
}
