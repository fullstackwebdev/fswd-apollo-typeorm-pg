import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { Request, Response } from 'express';
import { genSchema } from './utils/genSchema';
import { inspect } from 'util';

// import DataLoader from 'dataloader'; // TODO

import { PORT, SECRET, SERVER, TRUNCATE_ON_RELOAD, DBUSER, DBPASSWD, DBHOST, DBPORT, DATABASE } from './env';

const getMe = async req => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      return await jwt.verify(token, SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const apollo = new ApolloServer({
  schema: genSchema(),
  formatError: error => {
    console.error(error);
    const message = error.message; // .replace('Validation error: ', '');
    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => {
    if (req) {
      const authScope = await getMe(req);
      return {
        authScope,
        // loaders: { // TODO
        //   user: new DataLoader(keys =>
        //     loaders.user.batchUsers(keys, models),
        //   ),
        // },
      };
    }
  },
});

if (TRUNCATE_ON_RELOAD === 'true' && process.env.NODE_ENV !== 'production') {
  console.log(`Nuking DB...`);
  const pgp = require('pg-promise')();
  const db = pgp({
    host: DBHOST,
    port: DBPORT,
    database: DATABASE,
    user: DBUSER,
    password: DBPASSWD,
  });
  db.any(`TRUNCATE TABLE "user"`).catch();
}

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    apollo.applyMiddleware({ app });

    app.listen(PORT);
    console.log(`Listening on http://${SERVER}:${PORT}/graphql`);
  })
  .catch(error => console.log(error));
