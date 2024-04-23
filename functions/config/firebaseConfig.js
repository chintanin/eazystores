const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = require("./firebaseserviceaccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.EAZY_FIREBASE_DATABASE_URL,
});

const db = admin.database();

module.exports = db;
