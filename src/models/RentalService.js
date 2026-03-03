import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const RentalService = sequelize.define("rental_services", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING, // bike, horse, car
        allowNull: false,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
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

export default RentalService;
