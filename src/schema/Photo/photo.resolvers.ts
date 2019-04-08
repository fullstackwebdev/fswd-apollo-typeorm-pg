// https://github.com/typeorm/typeorm/blob/master/docs/many-to-one-one-to-many-relations.md
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Photo } from './photo.entity';
import { combineResolvers } from 'graphql-resolvers';
import { getConnection, Repository } from 'typeorm';
import { AuthenticationError } from 'apollo-server-core';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { User } from './../User/User.entity';

let repository: Repository<Photo>;
let loader;

const initialize = () => {
  const connection = getConnection();
  repository = connection.getRepository(Photo);
  loader = new GraphQLDatabaseLoader(connection);
};

export const resolvers = {
  Query: {
    photo: async (parent, args, context, info) => {
      repository === undefined && initialize();
      const photo = await repository.findOneOrFail(args.ID);
      return photo;
    },
    photos: async (parent: any, args: any, context: any, info: any) => {
      repository === undefined && initialize();
      const photos = await repository.find();
      return photos;
    },
  },
  Mutation: {
    createPhoto: async (_parent, { ...args }, { _session, _req }) => {
      repository === undefined && initialize();
      const photo = {};
      return photo;
    },
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
