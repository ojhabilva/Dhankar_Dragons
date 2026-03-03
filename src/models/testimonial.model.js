

import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Testimonial = sequelize.define("testimonials", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
    validate: {
      isIn: [["pending", "approved", "declined"]],
    },
  },
  is_active: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      isIn: [[0, 1]],
    },
  },
});

export default Testimonial;
