const Database = require('better-sqlite3');
const { database } = require('./config.json');

const db = new Database(database);

db.prepare(`
  CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alias TEXT NOT NULL,
    name TEXT NOT NULL,
    picture_url TEXT NOT NULL,
    discord_user_id TEXT NOT NULL,
    UNIQUE(alias, discord_user_id)
  )
`).run();