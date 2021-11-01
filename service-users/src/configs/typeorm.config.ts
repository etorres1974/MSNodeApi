/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = 
{
  "type": "mysql",
  "host": process.env.MYSQL_HOST,
  "port": process.env.MYSQL_PORT,
  "username": "root",
  "password": "admin",
  "database": process.env.MYSQL_DATABASE,
  "entities": ["dist/**/*.entity.js"],
  "synchronize": true
}
