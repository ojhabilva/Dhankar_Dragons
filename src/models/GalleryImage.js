import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const GalleryImage = sequelize.define("gallery_images", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["rooms", "dining", "scenic", "reception"]],
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default GalleryImage;
