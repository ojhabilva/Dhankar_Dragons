

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Room = sequelize.define("rooms", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wash_image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    capacity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            isIn: [[0, 1]],
        },
    },
});

export default Room;
