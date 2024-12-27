const express = require("express");
require("dotenv").config();
const cors = require("cors");

const session = require('express-session');

const userRoute = require("./routes/userRoute");
const errorController = require("./controllers/errorController");
const exerciseRoute = require('./routes/exerciseRoute');
const achievementRoute = require('./routes/achivementRoute');
const userAchievementRoute = require('./routes/userAchievementRoute');
const tokenRoute = require('./routes/tokenRoute');

const sequelize = require('./connection/sequelize');

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:4200", 
  methods: "GET, POST, PUT, DELETE", 
  credentials: true 
}));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/users', userRoute);
app.use('/exercises', exerciseRoute);
app.use('/achievements', achievementRoute);
app.use('/userAchivement', userAchievementRoute);
app.use('/tokens', tokenRoute);

app.get('/', (req, res) => {
  res.sendFile("C:/Users/sedla/Desktop/projekt/heble/heble/backend/public/index.html")
  //res.sendFile(__dirname + '/public/index.html');
});

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

(async () => {
  try {
      await sequelize.authenticate();
      console.log('Connection established successfully.');

      await sequelize.sync({ alter: true });
      console.log('All models synchronized successfully.');
  } catch (error) {
      console.error('Failed to synchronize models:', error);
  }
})();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
