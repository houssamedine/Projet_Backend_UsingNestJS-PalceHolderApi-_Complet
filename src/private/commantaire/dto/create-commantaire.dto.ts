import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNotEmptyObject,
} from 'class-validator';
import { Task } from '../../task/entities/task.entity';

export class CreateCommantaireDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3, { message: 'message.minLength' })
  @MaxLength(100, { message: 'message.maxLength' })
  message: string;

  @ApiProperty({ type: () => Task })
  @IsNotEmptyObject()
  task: Task;
}
