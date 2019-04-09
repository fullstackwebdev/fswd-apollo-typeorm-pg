import { isAuthenticated } from '../serviceHelpers';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { combineResolvers } from 'graphql-resolvers';
import { getConnection, Repository } from 'typeorm';
import { AuthenticationError } from 'apollo-server-core';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { Photo } from '../Photo/photo.entity';

import { SECRET } from '../../env';
import * as jwt from 'jsonwebtoken';
import { response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { inspect } from 'util';

let repository: Repository<User>;
let loader;

const initialize = () => {
  const connection = getConnection();
  repository = connection.getRepository(User);
  loader = new GraphQLDatabaseLoader(connection);
};

// const connection = createConnection({ ... });

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn,
  });
};

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    loggedIn: combineResolvers(isAuthenticated, (parent, args, context, info) => true),
    users: async () => {
      if (repository === undefined) {
        initialize();
      }
      const users = await repository.find();
      return users;
    },
    user: async (_parent, { id }, { _session, _req }) => {
      if (repository === undefined) {
        initialize();
      }
      return await repository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndMapMany('user.photos', 'user.photos', 'photo', 'user.id = photo.user.id')
        .getOne();
    },
    me: combineResolvers(isAuthenticated, async (parent, args, context, info) => {
      return await User.findOne({ id: context.authScope.user.id });
    }),
  },
  Mutation: {
    signIn: async (_parent, { username, password }, { _session, _req }) => {
      if (repository === undefined) {
        initialize();
      }
      const user = await repository
        .createQueryBuilder('User')
        .where({ username })
        .addSelect('User.password', 'User_password')
        .getOne();
      if (!user) {
        throw new AuthenticationError('No user found with this login credentials.');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Invalid password');
      }

      const token = jwt.sign({ user }, SECRET);
      console.log(`{ "x-token" : "${token}"}\n`);
      return { token };
    },
    createUser: async (_parent, { username, password, email }, { ..._models }) => {
      if (repository === undefined) {
        initialize();
      }

      const user = new User();
      user.username = username;
      user.password = password;
      user.email = email;

      await repository.save(user);
      return user;
    },
  },
  User: {
    photos: async (user: any, { ...args }, context: any, info: GraphQLResolveInfo) => {
      return await loader.loadMany(Photo, { id: user.id }, info);
    },
  },
};
