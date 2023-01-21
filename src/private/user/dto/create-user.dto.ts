import { RegisterDto } from './../../../public/auth/dto/register.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmptyObject, IsOptional } from 'class-validator';
import { Role } from '../../role/entities/role.entity';
import { Task } from '../../task/entities/task.entity';

export class CreateUserDto extends RegisterDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // isBlocked: boolean;

  // @ApiProperty()
  // @IsNotEmpty()
  // @MinLength(3, { message: 'salt.minLength' })
  // @MaxLength(30, { message: 'salt.maxLength' })
  // salt: string;

  @ApiProperty({ type: () => Task, isArray: true })
  @IsArray()
  @IsOptional()
  tasks?: Task[];

  @ApiProperty({ type: () => Role })
  @IsNotEmptyObject()
  @IsOptional()
  role?: Role;
}
