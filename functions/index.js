const { onRequest } = require("firebase-functions/v2/https");

const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
// app.get('/:id', (req, res) => res.send(req.params.id));
// app.post('/createuser', (req, res) => {

// })

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/users", userRoutes);
app.use("/stores", storeRoutes);

// Expose Express API as a single Cloud Function:
exports.api = onRequest(app);
