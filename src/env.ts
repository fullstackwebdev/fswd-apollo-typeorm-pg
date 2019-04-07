import * as dotenv from 'dotenv-flow';
dotenv.config();

export const { PORT, SECRET, SERVER, TRUNCATE_ON_RELOAD, DBUSER, DBPASSWD, DBHOST, DBPORT, DATABASE } = process.env;
