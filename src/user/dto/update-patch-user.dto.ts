import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdatePatchUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string;
}
