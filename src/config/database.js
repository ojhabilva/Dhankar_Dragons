import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const DB_PATH = path.resolve(process.cwd(), 'db.json');

class JsonStore {
  async read() {
    try {
      const data = await fs.readFile(DB_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }
  async write(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }
}

const store = new JsonStore();

class MockModel {
  constructor(name, schema) {
    this.name = name;
    this.schema = schema;
  }

  async findOne(options = {}) {
    const data = await store.read();
    let results = data[this.name] || [];

    if (options.where) {
      results = results.filter(item => {
        return Object.entries(options.where).every(([key, value]) => item[key] == value);
      });
    }

    return results[0] || null;
  }

  async findByPk(id) {
    const data = await store.read();
    const results = data[this.name] || [];
    return results.find(item => item.id == id) || null;
  }

  async findAll(options = {}) {
    const data = await store.read();
    let results = data[this.name] || [];

    if (options.where) {
      results = results.filter(item => {
        return Object.entries(options.where).every(([key, value]) => item[key] == value);
      });
    }

    if (options.order) {
      const [field, direction] = options.order[0];
      results.sort((a, b) => {
        if (direction === 'DESC') return b[field] > a[field] ? 1 : -1;
        return a[field] > b[field] ? 1 : -1;
      });
    }

    return results;
  }

  async create(values) {
    const data = await store.read();
    if (!data[this.name]) data[this.name] = [];

    const newItem = {
      id: data[this.name].length + 1,
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data[this.name].push(newItem);
    await store.write(data);
    return newItem;
  }

  async update(values, options) {
    const data = await store.read();
    if (!data[this.name]) return [0];

    let affectedCount = 0;
    data[this.name] = data[this.name].map(item => {
      if (Object.entries(options.where).every(([key, value]) => item[key] == value)) {
        affectedCount++;
        return { ...item, ...values, updatedAt: new Date().toISOString() };
      }
      return item;
    });

    await store.write(data);
    return [affectedCount];
  }

  async destroy(options) {
    const data = await store.read();
    if (!data[this.name]) return 0;

    const initialCount = data[this.name].length;
    data[this.name] = data[this.name].filter(item => {
      return !Object.entries(options.where).every(([key, value]) => item[key] == value);
    });

    const affectedCount = initialCount - data[this.name].length;
    await store.write(data);
    return affectedCount;
  }
}

const sequelize = {
  define: (name, schema) => new MockModel(name, schema),
  authenticate: async () => {
    console.log("JSON Mock DB Authenticated");
    return true;
  },
  sync: async () => {
    try {
      await fs.access(DB_PATH);
    } catch {

      await store.write({
        testimonials: [
          {
            id: 1,
            name: "Guest User",
            image: "https://avatar.iran.liara.run/public/1",
            text: "Welcome to Dhankhar Dragons! This is a mock testimonial.",
            rating: 5,
            status: "approved",
            is_active: 1,
            createdAt: new Date().toISOString()
          }
        ],
        users: [],
        rooms: [
          {
            id: 1,
            name: "Regular Room",
            slug: "regular",
            image: "/Home page/Choose Your Room/room1.png",
            capacity: "2 Adult + 1 Child",
            is_active: 1,
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: "Deluxe Room",
            slug: "deluxe",
            image: "/Home page/Choose Your Room/room2.png",
            capacity: "2 Adult + 1 Child",
            is_active: 1,
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            name: "Super Deluxe Room",
            slug: "super-deluxe",
            image: "/Home page/Choose Your Room/room3.png",
            capacity: "2 Adult + 1 Child",
            is_active: 1,
            createdAt: new Date().toISOString()
          }
        ],
        bookings: [],
        packages: [],
        rental_services: [],
        rental_bookings: []
      });
    }
    console.log("JSON Mock DB Synced");
    return true;
  },
  getDialect: () => "json-mock"
};

let isInitialized = false;

export const connectDB = async () => {
  if (isInitialized) return;
  try {
    console.log("Initializing JSON Mock Database...");
    await sequelize.authenticate();
    await sequelize.sync();
    isInitialized = true;
  } catch (error) {
    console.error("JSON Mock DB Error:", error);
  }
};

export default sequelize;
export const DataTypes = {
  INTEGER: 'INTEGER',
  STRING: 'STRING',
  TEXT: 'TEXT',
  BOOLEAN: 'BOOLEAN'
};
