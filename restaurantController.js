//
const { getRestaurantsByKeyword, getMenuByRestaurantId } = require("../models/restaurantModel");

const handleSearch = async (text) => {
    const results = await getRestaurantsByKeyword(text);
    if (results.length === 0) return "❌ No matching restaurants found.";
    return results.map(r => `🍽️ ${r.name} - ${r.cuisine}`).join("\n");
};

const handleMenu = async (restaurantId) => {
    const results = await getMenuByRestaurantId(restaurantId);
    if (results.length === 0) return "Menu not available.";
    return results.map(item => `📖 ${item.name} - ₹${item.price}`).join("\n");
};

module.exports = { handleSearch, handleMenu };
