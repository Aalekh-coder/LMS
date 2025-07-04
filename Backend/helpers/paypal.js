const paypal = require("paypal-rest-sdk");
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = require("../Config/env.js");

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  throw new Error("PayPal client ID or secret is missing.");
}

paypal.configure({
  mode: "sandbox",
  client_id: PAYPAL_CLIENT_ID,
  client_secret: PAYPAL_CLIENT_SECRET,
});

module.exports = paypal;
