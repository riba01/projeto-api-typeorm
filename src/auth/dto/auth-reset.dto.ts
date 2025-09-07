import { IsJWT, IsString, IsStrongPassword } from 'class-validator';

export class AuthResetDto {
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsJWT()
  token: string;
}
