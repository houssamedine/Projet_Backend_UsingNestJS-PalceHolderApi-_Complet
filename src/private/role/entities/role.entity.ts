import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { GenriqueModule } from './../../../commun/generiques/generique-module';
import { User } from '../../user/entities/user.entity';
@Entity({
  name: 'roles',
})
export class Role extends GenriqueModule {
  @ApiProperty()
  @Column({
    length: 10,
    unique: true,
  })
  slug: string;

  @ApiProperty()
  @Column({
    length: 10,
    unique: true,
  })
  label: string;

  @ApiProperty({ type: () => User })
  @OneToMany(() => User, (user) => user.role, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  user: User[];
}
