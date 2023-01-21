import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6, { message: 'username.minLength' })
  @MaxLength(20, { message: 'username.maxLength' })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3, { message: 'password.minLength' })
  @MaxLength(25, { message: 'password.maxLength' })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6, { message: 'email.minLength' })
  @MaxLength(20, { message: 'email.maxLength' })
  @IsEmail()
  email: string;
}
