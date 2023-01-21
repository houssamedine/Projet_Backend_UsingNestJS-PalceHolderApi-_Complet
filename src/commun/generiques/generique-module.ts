import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export class GenriqueModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    update: false,
  })
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;

  @CreateDateColumn()
  created_by;

  @UpdateDateColumn()
  updated_by;
}
