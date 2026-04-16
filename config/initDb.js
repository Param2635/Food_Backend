import db from './database.js';

function initializeDatabase() {
  try {
    // Create Foods table (use INTEGER for is_available)
    db.exec(`
      CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT,
        description TEXT,
        image_url TEXT,
        is_available INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Create Users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Users table ready');

    // Check if table is empty
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM foods');
    const { count } = countStmt.get();

    if (count === 0) {
      const insert = db.prepare(`
        INSERT INTO foods (name, price, category, description, is_available)
        VALUES (?, ?, ?, ?, ?)
      `);

      insert.run('Pizza Margherita', 299, 'Italian', 'Classic pizza with tomato and mozzarella', 1);
      insert.run('Butter Chicken', 349, 'Indian', 'Creamy tomato gravy with tender chicken', 1);
      insert.run('Veg Burger', 149, 'Fast Food', 'Crispy veg patty burger', 1);
      insert.run('Paneer Tikka', 249, 'Indian', 'Grilled cottage cheese with spices', 1);

      console.log('✅ Sample food data inserted successfully');
    }

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
  }
}

initializeDatabase();
export default initializeDatabase;