import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthForgetDto {
  @IsEmail()
  email: string;
}
