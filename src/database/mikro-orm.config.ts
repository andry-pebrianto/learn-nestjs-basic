import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/mariadb';
import { User } from './entities/User';

dotenv.config();

const logger = new Logger('MikroORM');

export default defineConfig({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'sample',
  entities: [User],
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  migrations: {
    path: './src/database/migrations',
  },
  allowGlobalContext: true,
});
