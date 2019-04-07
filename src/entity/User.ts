/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column()
  email: string;

  @Column("boolean", { default: false })
  forgotPasswordLocked: boolean;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
