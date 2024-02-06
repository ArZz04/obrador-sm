const sqlite3 = require('sqlite3').verbose();
let sql;

let db = new sqlite3.Database('./SantaMariaDB.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the Santa Maria database.');
    }
});


module.exports = db;