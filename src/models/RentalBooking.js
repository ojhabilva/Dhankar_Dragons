import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const RentalBooking = sequelize.define("rental_bookings", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rental_service_id: {
        type: DataTypes.INTEGER,
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
    booking_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        validate: {
            isIn: [["pending", "confirmed", "cancelled"]],
        },
    },
});

export default RentalBooking;
