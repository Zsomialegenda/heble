//Start of Required libraries
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/user");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");
//End of Required libraries

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Parse request body
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Mount routes
app.use("/user", userRoute);
app.use("/auth", authRoutes);

// Start of Test routes //
app.get("/server/testRun", (req, res) => {
  res.status(200).json({ massage: `The server is running.` });
}); // Testing if fthe server is alivbe

// app.get('/server/send', (req, res) => {
//   res.send('Hello from the server');
// }); // Testing if sendinngg works correctly

app.get("/server/test/:id", (req, res) => {
  const userId = req.params.id;
  res.status(200).json({ message: `User ID: ${userId}` });
}); // Testing if parameter datas work correctly
// End of Test routes //

// Handle errors
app.use(errorController.get404);
app.use(errorController.get500);

// Log unhandled requests
app.use((req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found." });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
