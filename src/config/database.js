import { Sequelize, DataTypes } from 'sequelize';
import sqlite3 from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dialect = (process.env.DB_DIALECT || 'sqlite');
const storage = path.isAbsolute(process.env.DB_STORAGE || './database.sqlite')
  ? process.env.DB_STORAGE
  : path.resolve(process.cwd(), process.env.DB_STORAGE || './database.sqlite');


let sequelize;

if (!global.sequelize) {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storage,
    dialectModule: sqlite3,
    logging: false,
  });
  global.sequelize = sequelize;
} else {
  sequelize = global.sequelize;
}

let syncPromise = null;

export const connectDB = async () => {
  if (!syncPromise) {
    syncPromise = sequelize.sync({ alter: true });
  }
  await syncPromise;
  return sequelize;
};

export { sequelize, DataTypes };
export default sequelize;
