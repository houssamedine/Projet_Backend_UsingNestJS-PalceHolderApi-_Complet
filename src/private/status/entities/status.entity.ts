import { GenriqueModule } from './../../../commun/generiques/generique-module';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/private/task/entities/task.entity';

@Entity({ name: 'status' })
export class Status extends GenriqueModule {
  @ApiProperty()
  @Column({
    length: 10,
    unique: true,
  })
  code: string;

  @ApiProperty({ type: () => Task })
  @ManyToOne(() => Task, (task) => task.status)
  task: Task;
}
