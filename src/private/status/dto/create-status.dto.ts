import { Task } from './../../task/entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5, { message: 'code.minLength' })
  @MaxLength(10, { message: 'code.maxLength' })
  code: string;

  @ApiProperty({ type: () => Task })
  @IsNotEmptyObject()
  task: Task;
}
