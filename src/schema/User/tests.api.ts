import axios from 'axios';
import { inspect } from 'util';

const PORT = 3000;
const API_URL = `http://localhost:${PORT}/graphql`;

const setToken = token => {
  return token ? { headers: { 'x-token': token } } : null;
};

export const signIn = async variables => {
  return axios.post(API_URL, {
    query: `
  mutation(
    $username: String!,
    $password: String!
  ) {
    signIn(
      username: $username,
      password: $password
    ) {
      token
      message
    }
  }
    `,
    variables,
  });
};

export const createAccount = async variables => {
  // console.log(`got ${inspect(variables)}`);
  return axios.post(API_URL, {
    query: `
    mutation (
      $username: String!,
      $email: String!,
      $password: String!
    ) {
      createUser(username:$username, password:$password, email:$email) 
      {
          username
          email
          password
      }
    }
    `,
    variables,
  });
};

export const getUsers = async variables => {
  return axios.post(API_URL, {
    query: `
query {
  users
  {
    username
    password
    email
  }
}
    `,
    variables,
  });
};

export const isLoggedin = async token => {
  return axios.post(
    API_URL,
    {
      query: `
      {
        loggedIn 
      }
    `,
    },
    setToken(token),
  );
};
