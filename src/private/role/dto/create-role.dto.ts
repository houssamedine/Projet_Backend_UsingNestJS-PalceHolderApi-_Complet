import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { User } from '../../user/entities/user.entity';
export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3, { message: 'slug.minLength' })
  @MaxLength(10, { message: 'slug.maxLength' })
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3, { message: 'slug.minLength' })
  @MaxLength(20, { message: 'slug.maxLength' })
  label: string;

  @ApiProperty({ type: () => User, isArray: true })
  @IsArray()
  user: User[];
}
