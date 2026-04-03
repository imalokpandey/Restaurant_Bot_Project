//
//const { getRecommendations } = require("../db/recommendation");

const { ActivityHandler, BotFrameworkAdapter } = require("botbuilder");
const { handleSearch, handleMenu } = require("../controllers/restaurantController");
const { handleReservation } = require("../controllers/reservationController");
const { handleOrder } = require("../controllers/orderController");

const botAdapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID || "",
    appPassword: process.env.MICROSOFT_APP_PASSWORD || ""
});

const botLogic = new ActivityHandler();

botLogic.onMessage(async (context, next) => {
    const userText = context.activity.text.toLowerCase();

    if (userText.startsWith("search")) {
        const keyword = userText.replace("search", "").trim();
        const response = await handleSearch(keyword);
        await context.sendActivity(response);
    } else if (userText.startsWith("menu")) {
        const id = parseInt(userText.split(" ")[1]); // menu 1
        const response = await handleMenu(id);
        await context.sendActivity(response);
    } else if (userText.startsWith("reserve")) {
        const [, name, rid, date, time, guests] = userText.split(" ");
        const data = {
            name,
            restaurant_id: parseInt(rid),
            date,
            time,
            guests: parseInt(guests)
        };
        const response = await handleReservation(data);
        await context.sendActivity(response);
    } else if (userText.startsWith("order")) {
        const orderData = {
            name: "John", // Static for now, can replace with context.user
            items: [{ name: "Pizza", price: 199 }, { name: "Coke", price: 49 }],
            total: 248
        };
        const response = await handleOrder(orderData);
        await context.sendActivity(response);
    } else {
        await context.sendActivity("Try commands like:\n🔎 `search pizza`\n📋 `menu 1`\n📅 `reserve John 1 2025-07-12 19:00 2`\n🛍️ `order`");
    }

    await next();
});

module.exports = { botAdapter, botLogic };
//



const { trackOrder } = require("../db/mysql-connection");

botLogic.onMessage(async (context, next) => {
    const userText = context.activity.text.toLowerCase();

    if (userText.includes("track order")) {
        const orderId = userText.match(/\d+/)?.[0]; // Extract order ID
        if (orderId) {
            trackOrder(orderId, async (err, status) => {
                if (err) {
                    await context.sendActivity("❌ Error fetching order.");
                } else {
                    await context.sendActivity(`📦 Your order status: ${status}`);
                }
            });
        } else {
            await context.sendActivity("Please provide a valid order ID.");
        }
    }

    await next();
});
const { getRecommendations } = require("../db/recommendation");

botLogic.onMessage(async (context, next) => {
    const userText = context.activity.text.toLowerCase();
    const userId = context.activity.from.id;

    if (userText.includes("recommend")) {
        getRecommendations(userId, async (err, items) => {
            if (err) {
                await context.sendActivity("❌ Unable to fetch recommendations.");
            } else {
                await context.sendActivity(`🍽️ Recommended for you: ${items.join(", ")}`);
            }
        });
    }

    await next();
});

botLogic.onMessage(async (context, next) => {
    const userText = context.activity.text.toLowerCase();
    const userId = context.activity.from.id; // unique user identifier

    if (userText.includes("hello")) {
        await context.sendActivity("👋 Hello! I can help you find restaurants, explore menus, and make reservations.");
    } 
    else if (
        userText.includes("recommend") || 
        userText.includes("suggest") ||
        userText.includes("something good")
    ) {
        getRecommendations(userId, async (err, items) => {
            if (err) {
                console.error("Recommendation error:", err);
                await context.sendActivity("Sorry, I couldn't fetch recommendations right now.");
            } else if (items.length === 0) {
                await context.sendActivity("Looks like you haven't ordered yet. Try something new from the menu!");
            } else {
                await context.sendActivity(`Based on your past orders, you might like: ${items.join(", ")}`);
            }
        });
    } 
    else {
        await context.sendActivity("I'm not sure how to help with that yet.");
    }

    await next();
});
//FILE :bot/botSetup.js
// This file sets up the bot's message handling logic and integrates with the restaurant's database for

const { CardFactory } = require("botbuilder");

botLogic.onMessage(async (context, next) => {
    const userText = context.activity.text.toLowerCase();

    if (userText.includes("menu")) {
        const card = CardFactory.heroCard(
            "📋 Today's Special",
            "Choose from our popular dishes below:",
            ["https://source.unsplash.com/400x200/?food"],
            [
                {
                    type: "imBack",
                    title: "🍕 Pizza",
                    value: "Order pizza"
                },
                {
                    type: "imBack",
                    title: "🍔 Burger",
                    value: "Order burger"
                },
                {
                    type: "imBack",
                    title: "🍝 Pasta",
                    value: "Order pasta"
                }
            ]
        );
        await context.sendActivity({ attachments: [card] });
    }

    await next();
});
