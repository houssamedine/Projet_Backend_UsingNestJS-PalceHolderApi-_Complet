import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GenriqueModule } from '../../../commun/generiques/generique-module';
import { Task } from '../../task/entities/task.entity';

@Entity({ name: 'comantaires' })
export class Commantaire extends GenriqueModule {
  @ApiProperty()
  @Column({
    length: 10,
    unique: true,
  })
  message: string;

  @ApiProperty({ type: () => Task })
  @ManyToOne(() => Task, (task) => task.commant)
  task: Task;
}
