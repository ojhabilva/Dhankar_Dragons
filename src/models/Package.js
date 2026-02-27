import { DataTypes } from "sequelize";
import sequelize from "../config/database";

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
        type: DataTypes.STRING,
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
});

export default Package;
