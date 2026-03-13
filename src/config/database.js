import { Sequelize, DataTypes } from 'sequelize';
import sqlite3 from 'sqlite3';
import mysql2 from 'mysql2';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dialect = (process.env.DB_DIALECT || 'sqlite');

let sequelize;

if (!global.sequelize) {
  if (dialect === 'mysql') {
    console.log('Initializing Sequelize with MySQL...');
    sequelize = new Sequelize(
      process.env.DB_NAME || 'dhankar_dragons',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        dialect: 'mysql',
        dialectModule: mysql2,
        logging: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );
  } else {
    // Default to SQLite
    console.log('Initializing Sequelize with SQLite...');
    const storage = path.isAbsolute(process.env.DB_STORAGE || './database.sqlite')
      ? process.env.DB_STORAGE
      : path.resolve(process.cwd(), process.env.DB_STORAGE || './database.sqlite');

    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: storage,
      dialectModule: sqlite3,
      logging: false,
    });
  }
  global.sequelize = sequelize;
} else {
  sequelize = global.sequelize;
}

let syncPromise = null;

export const connectDB = async () => {
  if (!syncPromise) {
    try {
      console.log('Attempting to connect to the database...');
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      syncPromise = sequelize.sync();
      await syncPromise;
      console.log('Database models synchronized.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }
  await syncPromise;
  return sequelize;
};

export { sequelize, DataTypes };
export default sequelize;
