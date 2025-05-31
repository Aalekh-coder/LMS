require("dotenv").config({path:".env"});

const { PORT, CLIENT_URL, DB_URL, JWT_SECRET } = process.env;

module.exports = { PORT, CLIENT_URL, DB_URL, JWT_SECRET };