const express = require("express");
require("dotenv").config();
const cors = require("cors");

const userRoute = require("./routes/user");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/errorController");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:4200", methods: "GET,POST,PUT,DELETE", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/user", userRoute);
app.use("/auth", authRoutes);

// Error handling
app.use(errorController.get404);
app.use(errorController.get500);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
