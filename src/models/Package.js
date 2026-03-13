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
    season: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Summer",
    },
});

export default Package;
