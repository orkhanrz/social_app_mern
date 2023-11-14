require("dotenv/config");
const express = require("express");
const app = express();
const path = require("path");
const db = require("./db/db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const errorMiddleware = require("./middlewares/error");

const PORT = process.env.PORT || 8000;

//Middlewares
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

app.use(errorMiddleware);

db.connect(() => {
  app.listen(PORT, () => {
    console.log("App runs on port: ", PORT);
  });
});
