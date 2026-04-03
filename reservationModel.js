//
const db = require("../db/mysql-connection");

const makeReservation = (data) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO reservations (name, restaurant_id, date, time, guests) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [data.name, data.restaurant_id, data.date, data.time, data.guests], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

module.exports = { makeReservation };
