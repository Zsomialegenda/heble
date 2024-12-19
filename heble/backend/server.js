const express = require("express");
require("dotenv").config();
const cors = require("cors");

const userRoute = require("./routes/user");
const errorController = require("./controllers/errorController");
const exerciseRoutes = require('./routes/exercise');
const achievementRoutes = require('./routes/achivement');
const userAchievementRoutes = require('./routes/userAchievementRoutes');

const app = express();

// Middleware
app.use(cors(
  {
    origin: "http://localhost:4200", 
    methods: "GET, POST, PUT, DELETE", 
    credentials: true 
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoute);
app.use('/exercises', exerciseRoutes);
app.use('/userAchivements', userAchievementRoutes);

// Error handling
app.use(errorController.get404);
app.use(errorController.get500);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('All tables created successfully!');
  })
  .catch(err => {
    console.error('Failed to create tables:', err.message);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
