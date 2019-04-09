/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity, OneToMany, JoinTable } from 'typeorm';
import { Photo } from '../Photo/photo.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column({select: false})
  password: string;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column()
  email: string;

  @Column("boolean", { default: false })
  forgotPasswordLocked: boolean;

  @OneToMany(type => Photo, photo => photo.user)
  @JoinTable()
  photos: Photo[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
