import { skip } from 'graphql-resolvers';
import { AuthenticationError } from 'apollo-server-core';

export const isAuthenticated = (parent, args, { authScope }) =>
  authScope ? skip : new AuthenticationError('Not authenticated as user');
