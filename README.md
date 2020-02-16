#  Full Stack Web Development Apollo-TypeORM-PostgreSQL Boilerplate 

[FULL STACK WEB DEVELOPMENT, LLC](http://www.fullstackwebdevelopment.com/)

Commercial license available.

[Contact here](mailto:sales@fullstackwebdevelopment.com)

## Running

Steps to run this project:

1. Run `npm install`
2. Setup PostgreSQL DB data directory `sudo setfacl -m u:26:-wx ./db-data`
3. Run `./db.sh`
4. Run `npm run start`
5. Run `npm run test`

```sh
$ sudo setfacl -m u:26:-wx ./db-data

```

```sh
$ npm run start

> fswd-postgresql-typeorm-apollo@1.0.0 start /home/rtx3800/dev/fswd/fswd-apollo-typeorm-pg
> ts-node-dev src/index.ts

Using ts-node version 3.3.0, typescript version 3.4.2
Type "PhotoInterface" is missing a "__resolveType" resolver. Pass false into "resolverValidationOptions.requireResolversForResolveType" to disable this warning.
Nuking DB...TRUNCATE_ON_RELOAD set to true
Listening on http://localhost:3000/graphql

```


```sh
$ npm run test

> fswd-postgresql-typeorm-apollo@1.0.0 test /home/rtx3800/dev/fswd/fswd-apollo-typeorm-pg
> jest

 PASS  src/schema/Jobs/job.tests.spec.ts
  jobs
    ✓ creates a job (38ms)
    ✓ get all jobs (68ms)
    ✓ get specific job id  (6ms)

  console.log src/schema/User/tests.api.ts:50
    got 'http://localhost:3000/graphql'

 PASS  src/schema/User/tests.spec.ts
  users
    sanity check
      ✓ get all users (36ms)
      ✓ creates a new user (75ms)
    jest sequential work around
      ✓ should login (70ms)
      ✓ should check I am loggedin (7ms)
      ✓ should get my id (7ms)

  console.log src/schema/User/tests.api.ts:50
    got 'http://localhost:3000/graphql'

 PASS  src/schema/Photo/photo.tests.spec.ts
  photos
    ✓ creates a photo (17ms)
    ✓ get all photos (8ms)
    ✓ get all nested photos via user (13ms)

Test Suites: 3 passed, 3 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        2.204s
Ran all test suites.

```

---

## Scratch pad notes

### install 
npm install @types/pg

Setup Apollo Server
----
```
npm install -P apollo-server graphql
npm install -P apollo-server-express
npm install -P graphql-tag 

npm install -D @types/graphql

Setup ApolloServer
---
/// index.ts
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});

... create ./src/schema with typedef and schema

---
```


### Setup TypeORM and Postgresql
----
```

npm install typeorm --save
npm install pg --save

typeorm, make sure your tsconfig.json has:
"emitDecoratorMetadata": true,
"experimentalDecorators": true,

Init typeorm

 npx typeorm init --express --docker --db postgres

Install
npm install

Create docker-compose.yml
---
  db:
    image: centos/postgresql-10-centos7
    # restart: always
    environment:
      POSTGRESQL_DATABASE: fswd1
      POSTGRESQL_USER: fswd
      POSTGRESQL_PASSWORD: example
      POSTGRESQL_ADMIN_PASSWORD: example
    volumes:
      - ./db-data:/var/lib/pgsql/data #sudo setfacl -m u:26:-wx ./db-data
    ports:
      - 5432:5432
---

Set ormconfig.json password

Set docker-compose password
Set db-data permissions
---
sudo setfacl -m u:26:-wx ./db-data
---




```


### SETUP A NODE TYPESCRIPT DEVELOPMENT ENVIRONMENT
----

```
npm install -P typescript
npx tsc --init

... edit tsconfig.json change es6

install node types

npm i -D @types/node

install express and types
 npm i express
 npm i -D @types/express


 install tsc-node-dev which will watch files and respawn

npm i ts-node-dev --save-dev

modify packages.json

add eslint 
npm install -P eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin 

create .eslintrc.js
----
module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
 parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  rules:  {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
----


add prettier

npm install -D prettier eslint-config-prettier eslint-plugin-prettier 

create .prettierrc.js

update .eslintrc.js rules (https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)



update vscode workspace config
----

"eslint.autoFixOnSave":  true,
"eslint.validate":  [
  "javascript",
  "javascriptreact",
  {"language":  "typescript",  "autoFix":  true  },
  {"language":  "typescriptreact",  "autoFix":  true  }
],

....

"editor.formatOnSave":  true,
"[javascript]":  {
  "editor.formatOnSave":  false,
},
"[javascriptreact]":  {
  "editor.formatOnSave":  false,
},
"[typescript]":  {
  "editor.formatOnSave":  false,
},
"[typescriptreact]":  {
  "editor.formatOnSave":  false,
},


