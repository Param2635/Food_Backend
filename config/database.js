import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'food.db');

const db = new Database(dbPath, { verbose: console.log });

// Enable foreign keys (good practice)
db.pragma('foreign_keys = ON');

console.log('✅ SQLite Database connected at:', dbPath);

export default db;