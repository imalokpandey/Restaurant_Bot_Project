//
const connection = require("./mysql-connection").connection;

function getRecommendations(userId, callback) {
    const query = `
        SELECT items FROM orders
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 3;
    `;
    connection.query(query, [userId], (err, results) => {
        if (err) return callback(err);
        const items = results.flatMap(order => order.items.split(", "));
        const uniqueItems = [...new Set(items)];
        callback(null, uniqueItems.slice(0, 5)); // Return top 5
    });
}

module.exports = { getRecommendations };
