import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../enums/role.enum';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'int',
    name: 'id',
    comment: 'Primary Key',
  })
  id?: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 180,
    unique: true,
  })
  email: string;

  @Column({
    length: 128,
  })
  password: string;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  birthAt?: string;

  @Column({
    default: Role.USER,
  })
  role?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
