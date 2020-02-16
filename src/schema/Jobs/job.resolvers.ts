/* eslint-disable @typescript-eslint/camelcase */
// https://github.com/typeorm/typeorm/blob/master/docs/many-to-one-one-to-many-relations.md
import { Job } from './job.entity';
import { getConnection, Repository } from 'typeorm';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { inspect } from 'util';
import { GraphQLResolveInfo } from 'graphql';

let repository: Repository<Job>;
let connection;
let loader;

const initialize = () => {
  connection = getConnection();
  repository = connection.getRepository(Job);
  loader = new GraphQLDatabaseLoader(connection);
};

export const resolvers = {
  Query: {
    job: async (parent, args, context, info) => {
      repository === undefined && initialize();
      const job = await repository.findOneOrFail(args.id);
      const _job = {
        ...job,
        date_created: new Date(job.date_created)
          .toISOString()
          .replace('.', '+')
          .replace('Z', '0'),
      };
      return _job;
    },
    jobs: async (_parent, { ...args }, { filter, ...allInone }) => {
      repository === undefined && initialize();
      const jobs = await repository
        .createQueryBuilder('job')
        // .leftJoinAndMapOne('job.user.id', User, 'user', 'user.id = job.user.id')
        // .select(['job', 'user.id'])
        .getMany();

      const _jobs = jobs.map(j => {
        return {
          ...j,
          date_created: new Date(j.date_created)
            .toISOString()
            .replace('Z', '0')
            .replace('.', '+'),
        };
      });
      return _jobs;
    },
  },
  Mutation: {
    createJob: async (_parent, { job }, { ...allInone }) => {
      repository === undefined && initialize();

      const myJob = new Job();
      // const job = new Job(); // Object.assign(, args);
      myJob.title = job.title;
      myJob.id = job.id;
      myJob.snippet = job.snippet;
      Object.assign(myJob, job);
      //myJob.date_created = Date.parse(job.date_created);

      // console.log(`!!!!got args ${inspect(job)}`);

      // myJob.name = job.name;

      const _job = await connection.manager.save(myJob);
      return _job;
    },
    updateJob: async (_parent, { ...args }, { _session, _req }) => {
      repository === undefined && initialize();
      return {};
    },
    deleteJob: async (_parent, { ...args }, { _session, _req }) => {
      repository === undefined && initialize();
    },
    toggleJob: async (_parent, { ...args }, { _session, _req }) => {
      repository === undefined && initialize();
    },
  },
  /// nested documents
  // Photo: {
  //   user: async (_: any, args: { id: string }, context: any, info: GraphQLResolveInfo) => {
  //     const result = await loader.loadOne(User, { id: _.user.id }, info);
  //     return result;
  //   },
  // },
};
