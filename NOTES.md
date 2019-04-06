
Setup TypeORM and Apollo Server
----
```

npm install typeorm --save
npm install pg --save

typeorm, make sure your tsconfig.json has:
"emitDecoratorMetadata": true,
"experimentalDecorators": true,



```


SETUP A NODE TYPESCRIPT DEVELOPMENT ENVIRONMENT
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
----


```