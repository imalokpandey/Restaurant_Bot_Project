//
const db = require("../db/mysql-connection");

const createOrder = (order) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO orders (customer_name, items, total_amount) VALUES (?, ?, ?)`;
        db.query(query, [order.name, JSON.stringify(order.items), order.total], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

module.exports = { createOrder };
