import { Sequelize, DataTypes } from 'sequelize';
import sqlite3 from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dialect = (process.env.DB_DIALECT || 'sqlite');
const storage = path.isAbsolute(process.env.DB_STORAGE || './database.sqlite')
  ? process.env.DB_STORAGE
  : path.resolve(process.cwd(), process.env.DB_STORAGE || './database.sqlite');

console.log(`[DB] Using storage: ${storage}`);

let sequelize;

if (!global.sequelize) {
  console.log('[DB] Creating new Sequelize instance...');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storage,
    dialectModule: sqlite3,
    logging: console.log,
  });
  global.sequelize = sequelize;
} else {
  sequelize = global.sequelize;
}

export const connectDB = async () => {
  //
  return sequelize;
};

export { sequelize, DataTypes };
export default sequelize;
