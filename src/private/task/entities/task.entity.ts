import { GenriqueModule } from './../../../commun/generiques/generique-module';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Commantaire } from '../../commantaire/entities/commantaire.entity';
import { Status } from 'src/private/status/entities/status.entity';
@Entity({ name: 'tasks' })
export class Task extends GenriqueModule {
  @ApiProperty()
  @Column({ length: 10 })
  title: string;

  @ApiProperty()
  @Column({ length: 50 })
  description: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @ApiProperty()
  @OneToMany(() => Commantaire, (commant) => commant.task, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  commant: Commantaire[];

  @ApiProperty({ type: () => Status })
  @OneToMany(() => Status, (status) => status.task, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  status: Status[];
}
