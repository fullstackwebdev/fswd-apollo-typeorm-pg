// https://github.com/typeorm/typeorm/blob/master/docs/many-to-one-one-to-many-relations.md

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Photo } from './photo.entity';
import { combineResolvers } from 'graphql-resolvers';
import { getConnection, Repository } from 'typeorm';
import { AuthenticationError } from 'apollo-server-core';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { User } from './../User/user.entity';
import { inspect } from 'util';
import { isAuthenticated } from '../serviceHelpers';
import { GraphQLResolveInfo } from 'graphql';

let repository: Repository<Photo>;
let connection;
let loader;

const initialize = () => {
  connection = getConnection();
  repository = connection.getRepository(Photo);
  loader = new GraphQLDatabaseLoader(connection);
  // const loader = new GraphQLDatabaseLoader(connection);
};

export const resolvers = {
  Query: {
    photo: async (parent, args, context, info) => {
      repository === undefined && initialize();
      const photo = await repository.findOneOrFail(args.ID);
      return photo;
    },
    photos: async (_parent, { ...args }, { authScope: { user }, ...allInone }) => {
      repository === undefined && initialize();
      //const photos = await repository.find({ user });
      const photos = await repository
        .createQueryBuilder('photo')

        // .leftJoinAndSelect('photo.user', 'user.id') // works
        .leftJoinAndMapOne('photo.user.id', User, 'user', 'user.id = photo.user.id')
        .select(['photo', 'user.id'])
        // .select(['user.id'])
        .getMany();
      // console.log(`got photos ${inspect(photos, false, 5)}`);
      return photos;
    },
  },
  Mutation: {
    createPhoto: combineResolvers(
      isAuthenticated,
      async (_parent, { ...args }, { authScope: { user }, ...allInone }) => {
        repository === undefined && initialize();

        const photo = new Photo();
        photo.name = args.photo.name;
        photo.user = user;

        const _photo = await connection.manager.save(photo);
        // console.log(`!!!photo results got args ${inspect(_photo)}`);
        return _photo;
      },
    ),
    updatePhoto: async (_parent, { ...args }, { _session, _req }) => {
      repository === undefined && initialize();
      return {};
    },
    deletePhoto: async (_parent, { ...args }, { _session, _req }) => {
      repository === undefined && initialize();
    },
    togglePhoto: async (_parent, { ...args }, { _session, _req }) => {
      repository === undefined && initialize();
    },
  },
  /// nested documents
  Photo: {
    // user: async (photo, args, { loaders }) => {
    //   console.log(`got!!! ${inspect(photo)}`);
    //   const user = await User.findOne({ where: { id: photo.user.id } });
    //   return user;
    //   //console.log(`gotUSER!!! ${inspect(photo)}`);
    //   //return await loaders.user.load(board.userId);
    // },
    user: async (_: any, args: { id: string }, context: any, info: GraphQLResolveInfo) => {
      // console.log(`got id ${inspect(args)}`);
      const result = await loader.loadOne(User, { id: _.user.id }, info);
      //const result = await loader.loadOne(User, { id }, info);
      return result;
    },
    //users:
  },
};

/*
    extend type Query {
    photo(ID: String): Photo
    photos: [Photo!]
  }

  extend type Mutation {
    createPhoto(Photo): Photo
    updatePhoto(Photo): Photo
    deletePhoto(ID: String): Boolean
    toggleSomething: Photo
  }

  type Photo {
    id: String
    name: String!
  }

  */
