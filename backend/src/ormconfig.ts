import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
dotenv.config();
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: "admin123",
  database: 'database',
  entities: ['dist/**/*.entity{.ts,.js}'],
  // logging: true,
  synchronize: true, // Should be false in production
};
