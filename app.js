//
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// MySQL DB connection
const db = require("./db/mysql-connection");

// Bot setup
const { botAdapter, botLogic } = require("./bot/botSetup");

// Middleware
app.use(express.json());

// Route for bot messages
app.post("/api/messages", (req, res) => {
    botAdapter.processActivity(req, res, async (context) => {
        await botLogic.run(context);
    });
});
app.get("/", (req, res) => {
    res.send("✅ Restaurant Bot Server is Running Successfully!");
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
