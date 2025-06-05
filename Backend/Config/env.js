require("dotenv").config({ path: ".env" });

const {
  PORT,
  CLIENT_URL,
  DB_URL,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

module.exports = {
  PORT,
  CLIENT_URL,
  DB_URL,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
