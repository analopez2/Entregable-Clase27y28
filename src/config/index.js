import dotenv from 'dotenv';
import minimist from 'minimist';
dotenv.config();

const args = minimist(process.argv.slice(2), {
  alias: { m: 'MODE', p: 'PORT', d: 'DEBUG' },
  default: { m: 'dev', p: process.env.PORT_DEFAULT, d: false },
});
const { PORT } = args;
export const config = {
  knex: {
    mysql: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        database: 'ecommerce',
      },
    },
    sqlite: {
      client: 'sqlite3',
      connection: {
        filename: './src/db/ecommerce.sqlite',
      },
      useNullAsDefault: true,
    },
  },
  server: {
    PORT: PORT,
  },
  selectedDB: process.env.TIPO_DB,
  UrlMongoDB: process.env.URL,
  Args: args,
};
