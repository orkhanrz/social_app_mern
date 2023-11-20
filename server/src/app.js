require("dotenv/config");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require("./db/db");
const path = require("path");
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL } });

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const messageRoutes = require("./routes/messages");
const conversationRoutes = require("./routes/conversation");

const errorMiddleware = require("./middlewares/error");

const PORT = process.env.PORT || 8000;

//Middlewares
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);

app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

app.use(errorMiddleware);

//Socket.io
//Track connected users
let users = [];

io.on("connection", (socket) => {
  console.log('connection:',users);
  //Add connected user to connected users array;
  socket.on('registerUser', (user) => {
    !users.find(u => user.userId === u.userId) && users.push(user);
  });

  socket.on('message', message => {
    const user = users.find(u => u.userId === message.to);

    user && io.to(user.socketId).emit('message', message);
  });

  //Remove user from connected users array;
  socket.on('disconnect', () => {
    users = users.filter(u => u.socketId === socket.id);
    console.log('disconnection:', users);
  });
});

db.connect(() => {
  server.listen(PORT, () => {
    console.log("App runs on port: ", PORT);
  });
});