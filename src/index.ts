import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { Request, Response } from 'express';
import { genSchema } from './utils/genSchema';
import { inspect } from 'util';
import { Routes } from './routes';
// import DataLoader from 'dataloader'; // TODO

export const SECRET = 'asdfsdfa' || process.env.SECRET;
export const PORT = 3000 || process.env.PORT;
export let SERVER_URI = `http://localhost:${PORT}`;

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

if (process.env.ENVIRONMENT === 'development' || true) {
  const pgp = require('pg-promise')();
  const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'fswd1',
    user: 'fswd',
    password: 'example',
  });
  db.any(`DROP TABLE "user"`).catch(console.error);
}

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    apollo.applyMiddleware({ app });

    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then(result => (result !== null && result !== undefined ? res.send(result) : undefined));
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });

    const listener = app.listen(PORT);
    console.log(`Listening on ${inspect(listener.address())}`);
    //SERVER_URI = `${listener.address()}`;
  })
  .catch(error => console.log(error));
