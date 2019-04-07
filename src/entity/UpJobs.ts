/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryColumn()
  id: string;

  // @Column()
  // @Generated("uuid")
  // uuid: string;

  @Column()
  title: string;

  @Column()
  snippet: string;

  @Column()
  category2: string;

  // https://typeorm.io/#/entities/simple-array-column-type
  @Column('simple-array')
  skills: string[];

  @Column()
  job_type: string;

  @Column()
  budget: number;

  @Column()
  duration: string;

  @Column()
  workload: string;

  @Column()
  job_status: string;

  @Column()
  date_created: string;

  @Column()
  url: string;

  // https://typeorm.io/#/entities/simple-json-column-type
  @Column('simple-json')
  client: {
    country: string,
    feedback: number,
    reviews_count: number,
    jobs_posted: number,
    past_hires: number,
    payment_verification_status: string,
  };
}
/*
  {
    "id": "~012ccbfb0942dca705",
    "title": "Looking for programmer to create an email (PST, mbox) parsing tool--preferably in Python or C",
    "snippet": "The deliverable will be an executable file that will take an email inbox in the form of a PST or mbox and convert the headers/met
adata into a spreadsheet. I am looking for a freelancer who has experience in Python or C with an added bonus of being able to build a gui.",
    "category2": "Web, Mobile & Software Dev",
    "subcategory2": "Scripts & Utilities",
    "skills": [
      "c++",
      "email-deliverable",
      "email-handling",
      "python"
    ],
    "job_type": "Hourly",
    "budget": 0,
    "duration": "Less than 1 month",
    "workload": "10-30 hrs/week",
    "job_status": "Open",
    "date_created": "2019-03-25T17:45:59+0000",
    "url": "http://www.upwork.com/jobs/~012ccbfb0942dca705",
    "client": {
      "country": "United States",
      "feedback": 0,
      "reviews_count": 0,
      "jobs_posted": 1,
      "past_hires": 1,
      "payment_verification_status": "VERIFIED"
    }
  },

*/

/*
# Column types for postgres
int, int2, int4, int8, smallint, integer, bigint, decimal, numeric, real, float, float4, float8, double precision, money, character varying, varchar, character, char, text, citext, hstore, bytea, bit, varbit, bit varying, timetz, timestamptz, timestamp, timestamp without time zone, timestamp with time zone, date, time, time without time zone, time with time zone, interval, bool, boolean, enum, point, line, lseg, box, path, polygon, circle, cidr, inet, macaddr, tsvector, tsquery, uuid, xml, json, jsonb, int4range, int8range, numrange, tsrange, tstzrange, daterange, geometry, geography
*/
