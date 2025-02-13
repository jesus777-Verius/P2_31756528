const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const path = require("path");

// Conectar a la base de datos SQLite
const dbPath = path.join(__dirname, "..", "database", "users.db");
const db = new sqlite3.Database(dbPath);

const createAdminAccount = async () => {
  try {
    db.get(
      "SELECT * FROM usuarios WHERE nombre = ?",
      ["pedro"],
      async (err, row) => {
        if (err) {
          console.error(err.message);
          return;
        }

        if (!row) {
          const hashedPassword = await bcrypt.hash("admin", 10);
          db.run(
            "INSERT INTO usuarios (nombre, contraseña) VALUES (?, ?)",
            ["pedro", hashedPassword],
            function (err) {
              if (err) {
                console.error(err.message);
              } else {
                console.log("Admin creado");
              }
            },
          );
        } else {
          console.log("Admin ya existe");
        }
      },
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = createAdminAccount;
