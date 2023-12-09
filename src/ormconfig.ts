import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin123',
  database: 'database',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Should be false in production
  // logging: true,
};
