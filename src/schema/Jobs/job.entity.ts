/* eslint-disable prettier/prettier */
// https://github.com/typeorm/typeorm/blob/master/test/functional/database-schema/column-types/postgres/entity/Post.ts
import { Entity, PrimaryColumn, Column,  BaseEntity, } from 'typeorm';

@Entity()
export class Job extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  snippet: string;

  @Column()
  category2: string;

  @Column({ nullable: true })
  subcategory2: string;

  @Column("simple-array")
  skills: string[];
  
  @Column()
  job_type: string;

  @Column()
  budget: number;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  workload: string;

  @Column()
  job_status: string;

  @Column()
  date_created: Date

  @Column()
  url: string

  @Column("json")
  client: object;

}
