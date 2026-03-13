import { sequelize, Room, Package, Testimonial, User } from '../src/models/index.js';
import { connectDB } from '../src/config/database.js';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('Connecting to database for seeding...');
    await connectDB();
    console.log('Connected.');

    // Seed Admin User if not exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@dhankhardragons.com';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      console.log('Seeding admin user...');
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
      await User.create({
        first_name: 'Admin',
        last_name: 'User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        is_active: 1
      });
    }

    // Seed/Update rooms
    console.log('Seeding rooms...');
    await Room.destroy({ where: {} }); // Clear existing to fix paths
    await Room.bulkCreate([
      {
        name: 'Standard Room',
        slug: 'standard-room',
        image: '/Dhankhar%20Dragons/Choose%20Your%20Room/room1.png',
        wash_image: '/Dhankhar%20Dragons/Choose%20Your%20Room/room1.png',
        capacity: '2 Adult + 0 Child',
        is_active: 1
      },
      {
        name: 'Deluxe Room',
        slug: 'deluxe-room',
        image: '/Dhankhar%20Dragons/Choose%20Your%20Room/room2.png',
        wash_image: '/Dhankhar%20Dragons/Choose%20Your%20Room/room2.png',
        capacity: '2 Adult + 1 Child',
        is_active: 1
      },
      {
        name: 'Super Deluxe Room',
        slug: 'super-deluxe-room',
        image: '/Dhankhar%20Dragons/Choose%20Your%20Room/room3.png',
        wash_image: '/Dhankhar%20Dragons/Choose%20Your%20Room/room3.png',
        capacity: '2 Adult + 1 Child',
        is_active: 1
      }
    ]);

    // Seed/Update packages
    console.log('Seeding packages...');
    await Package.destroy({ where: {} });
    await Package.create({
      name: 'Classic Ladakh Tour',
      duration: '5 days 4 nights',
      price: 25000,
      image: '/Dhankhar%20Dragons/packages/summer/water.png',
      description: 'A beautiful tour of Ladakh exploring the lakes and monasteries.',
      is_active: 1
    });

    // Seed/Update testimonials
    console.log('Seeding testimonials...');
    await Testimonial.destroy({ where: {} });
    await Testimonial.bulkCreate([
      {
        name: 'Rahul Sharma',
        image: 'https://avatar.iran.liara.run/public/boy',
        text: 'The hospitality at Dhankhar Dragons was exceptional. Highly recommended!',
        rating: 5,
        status: 'approved',
        is_active: 1
      },
      {
        name: 'Priya Verma',
        image: 'https://avatar.iran.liara.run/public/girl',
        text: 'Beautiful rooms and stunning views. Will visit again!',
        rating: 4,
        status: 'approved',
        is_active: 1
      }
    ]);

    console.log('SUCCESS: Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('FAILURE: Seeding failed.');
    console.error(error);
    process.exit(1);
  }
}

seed();
