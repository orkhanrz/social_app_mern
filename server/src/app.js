require("dotenv/config");
const http = require("http");
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require("./db/db");
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const messageRoutes = require("./routes/messages");
const conversationRoutes = require("./routes/conversation");

const errorMiddleware = require("./middlewares/error");

const PORT = process.env.PORT || 8000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);

app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

app.use(errorMiddleware);

//Socket.io
//Track connected users
let users = [];

io.on("connection", (socket) => {
  //Save user in users array
  socket.on("join", ({ userId, socketId }) => {
    const user = users.find((u) => u.userId === userId);
    !user && users.push({ userId, socketId });
  });

  //Emit message
  socket.on("message", (message) => {
    const user = users.find((u) => message.to === u.userId);
    user && io.to(user.socketId).emit("message", message);
  });

  //Remove user from users array
  socket.on("disconnect", () => {
    users = users.filter((u) => u.socketId !== socket.id);
  });
});

db.connect(() => {
  server.listen(PORT, () => {
    console.log("App runs on port: ", PORT);
  });
});
