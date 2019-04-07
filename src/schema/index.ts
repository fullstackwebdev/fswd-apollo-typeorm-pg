import gql from 'graphql-tag';

// The GraphQL schema
export const typeDefs = gql`
  type Query {
  }
  type Mutation {
  }
`;

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {},
  Mutation: {},
};
