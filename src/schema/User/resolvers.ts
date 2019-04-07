import { isAuthenticated } from '../serviceHelpers';
import { User } from './../../entity/User';
import * as bcrypt from 'bcryptjs';
import { combineResolvers } from 'graphql-resolvers';
import { getConnection, Repository } from 'typeorm';
import { AuthenticationError } from 'apollo-server-core';
import { SECRET } from '../../index';
import * as jwt from 'jsonwebtoken';

let repository: Repository<User>;

const initialize = () => {
  const connection = getConnection();
  repository = connection.getRepository(User);
};

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
  },
  Mutation: {
    signIn: async (_parent, { username, password }, { _session, _req }) => {
      const user = await User.findOne({ where: { username } });
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
};
