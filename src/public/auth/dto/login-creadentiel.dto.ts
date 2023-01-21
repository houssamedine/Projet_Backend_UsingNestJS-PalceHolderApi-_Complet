import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentielDto {
  @ApiProperty({
    description: 'You can add your email or userName',
  })
  @IsNotEmpty()
  identifiant: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
