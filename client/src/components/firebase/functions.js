const functions = require("firebase-functions");
const cors = require("cors")({ origin: true }); // Allow any origin
const admin = require("firebase-admin");
admin.initializeApp();

exports.myFunction = functions.https.onRequest((req, res) => {
  // Enable CORS for this function
  cors(req, res, () => {
    res.status(200).send("Hello from Firebase!");
  });
});
