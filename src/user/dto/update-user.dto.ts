import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {}
