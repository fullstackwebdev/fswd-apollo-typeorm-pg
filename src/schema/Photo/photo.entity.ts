/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity, ManyToOne } from 'typeorm';
import { User } from '../User/user.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  // @Column({ nullable: true })
  // userId: number;

  @ManyToOne(type => User, user => user.photos)
  user: User;
}
