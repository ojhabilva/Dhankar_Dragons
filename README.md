# Dhankhar Dragons — Hotel & Tourism Website

A full-stack hotel and tourism website for **Dhankhar Dragons**, located in Spiti Valley, Himachal Pradesh. Built with **Next.js 14**, **Sequelize ORM**, and **SQLite**, featuring a public-facing frontend and a complete admin panel.

---

## Tech Stack

| Layer       | Technology                                    |
| ----------- | --------------------------------------------- |
| Framework   | Next.js 14 (App Router)                       |
| Frontend    | React 18, Tailwind CSS, Swiper.js             |
| Backend     | Next.js API Routes                            |
| Database    | SQLite (via Sequelize ORM)                    |
| Auth        | JWT (jsonwebtoken + bcryptjs)                 |
| File Upload | Cloudinary                                    |
| Email       | Nodemailer                                    |
| Deployment  | Docker / Docker Compose                       |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone <repository-url>
cd dhankar_dragons
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite

ADMIN_EMAIL=admin@dhankhardragons.com
ADMIN_PASSWORD=admin123
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=24h
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

### Running with Docker

```bash
docker compose up
```

The app will be available at `http://localhost:5544`.

---

## Project Structure

```
├── public/                     # Static assets (images, icons, fonts)
├── scripts/
│   └── migrate.js              # JSON to SQLite data migration script
├── src/
│   ├── app/
│   │   ├── (frontend)/         # Public-facing pages (route group)
│   │   │   ├── page.jsx        # Homepage
│   │   │   ├── about/          # About page
│   │   │   ├── booking/        # Room booking form
│   │   │   ├── contact/        # Contact page
│   │   │   ├── experience/     # Spiti Valley experiences
│   │   │   ├── packages/       # Tour packages (summer/winter + dynamic)
│   │   │   ├── ride/           # Rental services (bike, horse, car)
│   │   │   ├── rooms/          # Room details (dynamic [slug] route)
│   │   │   ├── privacy-policy/ # Privacy policy
│   │   │   ├── components/     # Shared frontend components
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── BookingBar/
│   │   │   │   ├── Gallery/
│   │   │   │   ├── Room/
│   │   │   │   ├── RideComponents/
│   │   │   │   ├── TestimonialForm/
│   │   │   │   └── TestimonialSlider/
│   │   │   └── layout.js       # Frontend layout (header + footer + booking bar)
│   │   ├── admin/              # Admin panel pages
│   │   │   ├── page.jsx        # Dashboard with stats
│   │   │   ├── rooms/          # Room management (CRUD)
│   │   │   ├── packages/       # Package management (CRUD)
│   │   │   ├── testimonials/   # Testimonial moderation
│   │   │   ├── bookings/       # Room booking management
│   │   │   ├── rentals/        # Rental service management
│   │   │   ├── rental-bookings/# Rental booking management
│   │   │   ├── login/          # Admin login page
│   │   │   └── layout.jsx      # Admin layout (sidebar + auth guard)
│   │   ├── api/                # API routes
│   │   │   ├── rooms/          # GET, POST, PUT, DELETE
│   │   │   ├── packages/       # GET, POST, PUT, DELETE
│   │   │   ├── testimonials/   # GET, POST, PUT, DELETE
│   │   │   ├── bookings/       # GET, POST, PUT, DELETE
│   │   │   ├── rentals/        # GET, POST, PUT, DELETE
│   │   │   ├── rental-bookings/# GET, POST, PUT, DELETE
│   │   │   ├── upload/         # File upload endpoint
│   │   │   └── admin/          # Login & logout endpoints
│   │   └── MainLayout.js       # Root layout
│   ├── config/
│   │   ├── database.js         # Sequelize + SQLite configuration
│   │   └── mailer.js           # Nodemailer configuration
│   ├── models/                 # Sequelize models
│   │   ├── Room.js
│   │   ├── Package.js
│   │   ├── Booking.js
│   │   ├── RentalService.js
│   │   ├── RentalBooking.js
│   │   ├── User.js
│   │   ├── testimonial.model.js
│   │   └── index.js            # Model aggregator
│   ├── utils/                  # Utility functions
│   │   ├── auth.js             # JWT verification
│   │   └── jwt.js              # Token generation
│   └── middleware.js           # Route protection middleware
├── database.sqlite             # SQLite database file (auto-generated)
├── db.json                     # Legacy JSON data (used by migration script)
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## Database

The application uses **SQLite** as the database, managed through **Sequelize ORM**.

### Models

| Model            | Table              | Description                              |
| ---------------- | ------------------ | ---------------------------------------- |
| `Room`           | `rooms`            | Hotel rooms with title, price, category  |
| `Package`        | `packages`         | Tour packages with price and description |
| `Booking`        | `bookings`         | Room booking inquiries from guests       |
| `Testimonial`    | `testimonials`     | Guest reviews with approval workflow     |
| `RentalService`  | `rental_services`  | Bike, horse, car rental services         |
| `RentalBooking`  | `rental_bookings`  | Rental service booking requests          |
| `User`           | `users`            | User accounts                            |

### Database Initialization

The database is automatically created and synced when the server starts. Sequelize creates the tables based on the model definitions using `sequelize.sync({ alter: true })`.

### Data Migration

To migrate data from the legacy `db.json` file into SQLite:

```bash
node scripts/migrate.js
```

> **Warning:** This runs `sync({ force: true })` which drops and recreates all tables.

---

## API Routes

All API endpoints are under `/api/`.

| Method   | Endpoint                    | Description                         | Auth Required |
| -------- | --------------------------- | ----------------------------------- | ------------- |
| `GET`    | `/api/rooms`                | List all rooms                      | No            |
| `POST`   | `/api/rooms`                | Create a new room                   | No            |
| `PUT`    | `/api/rooms`                | Update a room                       | No            |
| `DELETE` | `/api/rooms?id=<id>`        | Delete a room                       | No            |
| `GET`    | `/api/packages`             | List all packages                   | No            |
| `POST`   | `/api/packages`             | Create a new package                | No            |
| `PUT`    | `/api/packages`             | Update a package                    | No            |
| `DELETE` | `/api/packages?id=<id>`     | Delete a package                    | No            |
| `GET`    | `/api/testimonials`         | Get approved testimonials           | No            |
| `GET`    | `/api/testimonials?all=true`| Get all testimonials (incl pending) | Yes (Admin)   |
| `POST`   | `/api/testimonials`         | Submit a new testimonial            | No            |
| `PUT`    | `/api/testimonials`         | Update testimonial status           | Yes (Admin)   |
| `DELETE` | `/api/testimonials?id=<id>` | Delete a testimonial                | Yes (Admin)   |
| `GET`    | `/api/bookings`             | List all bookings                   | No            |
| `POST`   | `/api/bookings`             | Create a booking inquiry            | No            |
| `GET`    | `/api/rentals`              | List all rental services            | No            |
| `POST`   | `/api/rental-bookings`      | Create a rental booking             | No            |
| `POST`   | `/api/upload`               | Upload an image file                | No            |
| `POST`   | `/api/admin/login`          | Admin login (returns JWT)           | No            |
| `POST`   | `/api/admin/logout`         | Admin logout                        | No            |

---

## Authentication

Admin authentication is handled via **JWT tokens**.

1. Admin logs in at `/admin/login` with email and password.
2. The server verifies credentials and returns a signed JWT token.
3. The token is stored in `localStorage` on the client.
4. Protected API routes verify the token via the `Authorization: Bearer <token>` header.
5. The admin layout component (`admin/layout.jsx`) guards all admin pages — unauthenticated users are redirected to the login page.

---

## Frontend Pages

| Page           | Route              | Description                                      |
| -------------- | ------------------ | ------------------------------------------------ |
| Homepage       | `/`                | Hero, room showcase, testimonials, gallery        |
| About          | `/about`           | Hotel story, mission, contact info                |
| Rooms          | `/rooms/[slug]`    | Individual room details with booking options      |
| Packages       | `/packages`        | Summer & winter tour packages + admin packages    |
| Package Detail | `/packages/[id]`   | Individual package details                        |
| Experience     | `/experience`      | Spiti Valley experiences and activities            |
| Ride           | `/ride`            | Bike, horse, car rental services                  |
| Booking        | `/booking`         | Room booking inquiry form                         |
| Contact        | `/contact`         | Contact information                               |
| Privacy Policy | `/privacy-policy`  | Privacy policy page                               |

---

## Admin Panel

Accessible at `/admin` after logging in.

| Section          | Route                    | Features                                       |
| ---------------- | ------------------------ | ---------------------------------------------- |
| Dashboard        | `/admin`                 | Overview stats (rooms, bookings, packages, etc) |
| Rooms            | `/admin/rooms`           | Add, edit, delete hotel rooms                   |
| Packages         | `/admin/packages`        | Add, edit, delete tour packages                 |
| Testimonials     | `/admin/testimonials`    | Approve, reject, delete guest reviews           |
| Room Bookings    | `/admin/bookings`        | View and manage room booking inquiries          |
| Rental Services  | `/admin/rentals`         | Manage bike, horse, car rental listings         |
| Rental Bookings  | `/admin/rental-bookings` | View rental booking requests                    |

---

## Available Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `npm run dev`    | Start the development server |
| `npm run build`  | Build for production         |
| `npm run start`  | Start the production server  |
| `npm run lint`   | Run ESLint                   |

---

## License

All rights reserved © Dhankhar Dragons.
