const { connect } = require("mongoose");
const {DB_URL} = require("./env")

const connectToDB = async () => {
  try {
    await connect(DB_URL, { dbName: "LMS" });
    console.log(`Connected to DB in NODE_ENV mode`);
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

module.exports = connectToDB;