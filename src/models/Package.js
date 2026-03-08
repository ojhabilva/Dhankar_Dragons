import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Package = sequelize.define("packages", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    days: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    nights: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: "",
    },
    is_active: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    terms_and_conditions: {
        type: DataTypes.TEXT,
        defaultValue: "[]",
    },
});

export default Package;
