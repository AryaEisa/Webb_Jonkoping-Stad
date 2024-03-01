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
        address TEXT, 
        img TEXT,
        CONSTRAINT stores_pkey PRIMARY KEY (id)
    )`);

    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS public.users
    (
        id SERIAL,
        name text,
        password text

    )`);

    await this.connection.query(`
      ALTER TABLE IF EXISTS public.users
          OWNER to postgres
    `);

    await this.connection.query(`
      ALTER TABLE IF EXISTS public.stores
          OWNER to postgres
    `);


    for (const store of stores) {

      const { rows } = await this.connection.query(`
        SELECT * FROM stores WHERE name = $1
      `, [store.name]);

      if (rows.length === 0) {
        console.log(`Inserting ${store.name}`);
        await this.connection.query(`
        INSERT INTO stores (name, url, district, address, img)
        VALUES ($1, $2, $3, $4, $5)
    `, [store.name, store.url, store.district, store.address, store.img]);
      }
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
