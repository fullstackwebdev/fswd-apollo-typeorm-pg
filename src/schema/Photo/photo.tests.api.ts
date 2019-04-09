import axios from 'axios';
import { inspect } from 'util';

import { PORT, SERVER } from '../../env';
// const PORT = 3000;
const API_URL = `http://${SERVER}:${PORT}/graphql`;

const setToken = token => {
  return token ? { headers: { 'x-token': token } } : null;
};

const getPhotos = async ({ variables, token }) =>
  axios.post(
    API_URL,
    {
      query: `
      query asdf {
        photos {
          name
          user {
            username
            id
          }
        }
      }  
      `,
      variables,
    },
    setToken(token),
  );

const createPhoto = async ({ variables, token }) =>
  axios.post(
    API_URL,
    {
      query: `
      mutation createPhoto($photo: PhotoInput!) {
        createPhoto(photo: $photo) {
          name
          user {
            username
          }
        }
      }  
      `,
      variables,
    },
    setToken(token),
  );

export { getPhotos, createPhoto };
