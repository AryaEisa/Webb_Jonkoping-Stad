const { Pool } = require('pg');

const stores = require('./stores.json');

class ModelClass {
  constructor() {
    this.connection = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: '12345',
      port: 5432,
    });
  }
//test
  async connectDatabase() {
    await this.connection.connect();
  }

  async setupDatabase() {
    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS public.stores
    (
        id SERIAL,
        name TEXT,
        url TEXT,
        district TEXT,
        category TEXT,
        address TEXT, 
        img TEXT,
        CONSTRAINT stores_pkey PRIMARY KEY (id)
    )`);

    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS public.users
    (
        id SERIAL,
        name TEXT,
        email TEXT,
        password TEXT,
        CONSTRAINT users_pkey PRIMARY KEY (id)
    )`);

    await this.connection.query(`
      ALTER TABLE IF EXISTS public.users
          OWNER to postgres
    `);

    await this.connection.query(`
      ALTER TABLE IF EXISTS public.stores
          OWNER to postgres
    `);

    // Insert default user
    const defaultUser = {
        name: 'admin',
        email: 'admin@example.com',
        password: 'adminpassword'
    };

    await this.connection.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `, [defaultUser.name, defaultUser.email, defaultUser.password]);

    console.log('Default user inserted.');
    
    for (const store of stores) {
      const { rows } = await this.connection.query(`
        SELECT * FROM stores WHERE name = $1
      `, [store.name]);

      if (rows.length === 0) {
        console.log(`Inserting ${store.name}`);
        await this.connection.query(`
        INSERT INTO stores (name, url, district, category, address, img)
        VALUES ($1, $2, $3, $4, $5, $6)
    `, [store.name, store.url, store.district, store.category, store.address, store.img]);
      }
    }
}
async insertVenue(newVenue) {
  try {
    await this.connection.query(`
      INSERT INTO stores (name, url, district, category, address, img)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [newVenue.name, newVenue.url, newVenue.district, newVenue.category, newVenue.address, newVenue.img]);
  } catch (error) {
    console.error('Error inserting venue:', error);
    throw error;
  }
}

async updateVenue(id, updatedVenue) {
  try {
    await this.connection.query(`
      UPDATE stores
      SET name = $1, url = $2, district = $3, category = $4, address = $5, img = $6
      WHERE id = $7
    `, [updatedVenue.name, updatedVenue.url, updatedVenue.district, updatedVenue.category, updatedVenue.address, updatedVenue.img, id]);
  } catch (error) {
    console.error('Error updating venue:', error);
    throw error;
  }
}

async deleteVenue(id) {
  try {
    await this.connection.query('DELETE FROM stores WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting venue:', error);
    throw error;
  }
}

async loginUser(username, password) {
  try {
      const { rows } = await this.connection.query(`
          SELECT * FROM users WHERE name = $1 AND password = $2
      `, [username, password]);

      if (rows.length > 0) {
          return true; // User credentials are correct
      } else {
          return false; // User credentials are incorrect
      }
  } catch (error) {
      console.error('Error logging in:', error);
      return false; // Return false in case of an error
  }
}

  async getStores() {
    const { rows } = await this.connection.query(`
      SELECT * FROM stores
    `);
    return rows;
  }
  
  async getStoresId(id) {
    const { rows } = await this.connection.query(`
      SELECT * FROM stores WHERE id = $1
    `, [id]);
    return rows;
}


}

module.exports = ModelClass;
