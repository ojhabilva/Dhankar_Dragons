import fs from 'fs/promises';
import path from 'path';
import {
    sequelize,
    Room,
    User,
    Package,
    Booking,
    RentalService,
    RentalBooking,
    Testimonial
} from '../src/models/index.js';

const DB_JSON_PATH = path.resolve(process.cwd(), 'db.json');

async function migrate() {
    try {
        console.log('--- Starting Migration from JSON to SQLite ---');

        // Read JSON data
        const jsonData = JSON.parse(await fs.readFile(DB_JSON_PATH, 'utf8'));

        // Sync SQLite (this will create tables)
        await sequelize.sync({ force: true });
        console.log('SQLite tables recreated.');

        // 1. Migrate Rooms
        if (jsonData.rooms && jsonData.rooms.length > 0) {
            await Room.bulkCreate(jsonData.rooms);
            console.log(`Migrated ${jsonData.rooms.length} rooms.`);
        }

        // 2. Migrate Testimonials
        if (jsonData.testimonials && jsonData.testimonials.length > 0) {
            await Testimonial.bulkCreate(jsonData.testimonials);
            console.log(`Migrated ${jsonData.testimonials.length} testimonials.`);
        }

        // 3. Migrate Users
        if (jsonData.users && jsonData.users.length > 0) {
            await User.bulkCreate(jsonData.users);
            console.log(`Migrated ${jsonData.users.length} users.`);
        }

        // 4. Migrate Packages
        if (jsonData.packages && jsonData.packages.length > 0) {
            await Package.bulkCreate(jsonData.packages);
            console.log(`Migrated ${jsonData.packages.length} packages.`);
        }

        // 5. Migrate Bookings
        if (jsonData.bookings && jsonData.bookings.length > 0) {
            await Booking.bulkCreate(jsonData.bookings);
            console.log(`Migrated ${jsonData.bookings.length} bookings.`);
        }

        // 6. Migrate Rental Services
        if (jsonData.rental_services && jsonData.rental_services.length > 0) {
            await RentalService.bulkCreate(jsonData.rental_services);
            console.log(`Migrated ${jsonData.rental_services.length} rental services.`);
        }

        // 7. Migrate Rental Bookings
        if (jsonData.rental_bookings && jsonData.rental_bookings.length > 0) {
            await RentalBooking.bulkCreate(jsonData.rental_bookings);
            console.log(`Migrated ${jsonData.rental_bookings.length} rental bookings.`);
        }

        console.log('--- Migration Completed Successfully ---');
        process.exit(0);
    } catch (error) {
        console.error('Migration Failed:', error);
        process.exit(1);
    }
}

migrate();
