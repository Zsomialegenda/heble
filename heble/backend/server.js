const express = require("express");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");

const userRoute = require("./routes/userRoute");
const exerciseRoute = require("./routes/exerciseRoute");
const achievementRoute = require("./routes/achivementRoute");
const userAchievementRoute = require("./routes/userAchievementRoute");
const experienceRoute = require("./routes/experienceRoute");
const tokenRoute = require("./routes/tokenRoute");
const leaderboardRoute = require("./routes/leaderboardRoute");

const sequelize = require("./utils/sequelize");

const { generateAchievements, generateUsers } = require("./utils/generator");

const app = express();

async function seedData() {
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Tables created successfully!\nTáblák sikeresen leggyártva!");
    })
    .catch((err) => {
      console.error("Failed/Sikertelen:", err.message);
    });

  (async () => {
    try {
      await sequelize.authenticate();

      await sequelize.sync({ force: true });

      await generateAchievements();
      await generateUsers();
    } catch (error) {
      console.error("Model sync failed/Model sync sikertelen:", error);
    }
  })();
}

//seedData();

// Middleware
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(
  session({
    secret: "Kicsicsirke_1298",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Routes
app.use("/users", userRoute);
app.use("/exercises", exerciseRoute);
app.use("/achievements", achievementRoute);
app.use("/userAchivements", userAchievementRoute);
app.use("/experiences", experienceRoute);
app.use("/tokens", tokenRoute);
app.use("/leaderboard", leaderboardRoute);

app.get("/", (req, res) => {
  res.sendFile(
    "C:/Users/sedla/Desktop/projekt/heble/heble/backend/public/index.html"
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
