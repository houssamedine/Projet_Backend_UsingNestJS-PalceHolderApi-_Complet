import { GenriqueModule } from '../../../commun/generiques/generique-module';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from '../../role/entities/role.entity';
import { Task } from '../../task/entities/task.entity';

@Entity({ name: 'users' })
export class User extends GenriqueModule {
  @ApiProperty()
  @Column({
    unique: true,
    length: 25,
  })
  username: string;

  @ApiProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  isBlocked: boolean;

  @Exclude()
  @Column({ update: false })
  salt: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @ApiProperty({ type: () => Task })
  @OneToMany(() => Task, (task) => task.user, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  tasks: Task[];
}
