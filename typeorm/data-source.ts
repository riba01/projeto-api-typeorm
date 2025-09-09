import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

// Carrega as variáveis de ambiente
dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS, //'jes198',
  database: process.env.DB_NAME, //'api'
  migrations: [`${__dirname}/migrations/**/*.ts`],
});

export default dataSource;
