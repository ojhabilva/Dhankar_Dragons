

import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Booking = sequelize.define("bookings", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    room_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customer_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customer_phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    check_in: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    check_out: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    guests: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
    },
});

export default Booking;
