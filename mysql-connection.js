require("dotenv").config(); // Load env variables

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

module.exports = connection;




//
// const mysql = require("mysql");
// require("dotenv").config();

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log("✅ Connected to MySQL Database.");
// });

// Track order by ID
function trackOrder(orderId, callback) {
    connection.query(
        "SELECT status FROM orders WHERE id = ?",
        [orderId],
        (err, results) => {
            if (err) return callback(err);
            if (results.length > 0) {
                callback(null, results[0].status);
            } else {
                callback(null, "Order not found");
            }
        }
    );
}

module.exports = {
    connection,
    trackOrder
};
