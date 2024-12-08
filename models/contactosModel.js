const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { DateTime } = require('luxon');


class ContactosModel {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, '../database/contactos.db'), (err) => {
            if (err) console.error('No se pudo conectar a la base de datos:', err.message);
            else console.log('Conectado a la base de datos SQLite.');
        });
        this.crearTabla();
    }
    crearTabla() {
        const sql = `CREATE TABLE IF NOT EXISTS contactos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT,
                email TEXT,
                comentario TEXT,
                ip TEXT,
                fecha_hora DATETIME)`;
        this.db.run(sql, (err) => {
            if (err) console.error('Error al crear la tabla:', err.message);
        });
    }
    insertarDatos({ nombre, email, comentario, ip }) {
        return new Promise((resolve, reject) => {
            const fechaHoraLocal = DateTime.now().setZone('America/Caracas').toFormat('yyyy-MM-dd HH:mm:ss');
            const sql = `INSERT INTO contactos (nombre, email, comentario, ip, fecha_hora) VALUES (?, ?, ?, ?, ?)`;
            this.db.run(sql, [nombre, email, comentario, ip, fechaHoraLocal], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    obtenerDatos() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM contactos ORDER BY fecha_hora DESC`;
            this.db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
}

module.exports = new ContactosModel();
