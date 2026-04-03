//
const db = require("../db/mysql-connection");

const getRestaurantsByKeyword = (keyword) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM restaurants WHERE name LIKE ? OR cuisine LIKE ?`;
        db.query(query, [`%${keyword}%`, `%${keyword}%`], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getMenuByRestaurantId = (restaurantId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM menu_items WHERE restaurant_id = ?`;
        db.query(query, [restaurantId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { getRestaurantsByKeyword, getMenuByRestaurantId };
