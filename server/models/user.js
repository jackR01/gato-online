const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gato.db');

// Crear usuario nuevo
function createUser(username, password, callback) {
  const stmt = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(stmt, [username, password], function (err) {
    if (err) {
      return callback(err);
    }
    // 👇 Aquí se accede correctamente a this.lastID
    callback(null, { id: this.lastID, username });
  });
}
function getUserByUsername(username, callback) {
  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    }
  );
}

module.exports = {
  createUser,
  getUserByUsername
};
