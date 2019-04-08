import axios from 'axios';
import { inspect } from 'util';

import { PORT, SERVER } from '../../env';
// const PORT = 3000;
const API_URL = `http://${SERVER}:${PORT}/graphql`;

const setToken = token => {
  return token ? { headers: { 'x-token': token } } : null;
};

// export const signIn = async variables => {
//   return axios.post(API_URL, {
//     query: `
//   mutation(
//     $username: String!,
//     $password: String!
//   ) {
//     signIn(
//       username: $username,
//       password: $password
//     ) {
//       token
//       message
//     }
//   }
//     `,
//     variables,
//   });
// };