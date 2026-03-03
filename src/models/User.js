

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  phone: {
    type: DataTypes.STRING(15),
    unique: true,
    allowNull: true
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "user"
  },

  is_active: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      isIn: [[0, 1]]
    }
  }
});

export default User;
