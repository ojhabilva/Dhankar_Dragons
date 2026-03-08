import sequelize from "../config/database.js";
import Room from "./Room.js";
import User from "./User.js";
import Package from "./Package.js";
import Booking from "./Booking.js";
import RentalService from "./RentalService.js";
import RentalBooking from "./RentalBooking.js";
import Testimonial from "./testimonial.model.js";
import GalleryImage from "./GalleryImage.js";
import ContactSubmission from "./ContactSubmission.js";

const models = {
    Room,
    User,
    Package,
    Booking,
    RentalService,
    RentalBooking,
    Testimonial,
    GalleryImage,
    ContactSubmission
};

export {
    sequelize,
    Room,
    User,
    Package,
    Booking,
    RentalService,
    RentalBooking,
    Testimonial,
    GalleryImage,
    ContactSubmission
};

export default models;
