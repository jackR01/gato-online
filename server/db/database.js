// server/db/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, '../gato.db'), (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite.');
  }
});

// Crear tabla si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0
  )`);
});

module.exports = db;
