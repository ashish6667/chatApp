import http from "http";
import { Server } from "socket.io";

let io;

const users = {};

// ✅ Dynamic CORS in Socket.IO
const allowedOrigins = [
  "https://chat-app-frontend-mu-teal.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

export const getReceiverSocketId = (receiverId) => users[receiverId];

export const initSocket = (app) => {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS (Socket.IO)"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket"], // Force WebSocket to avoid polling issues
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      users[userId] = socket.id;
      console.log("Online Users:", users);
    }

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (userId) delete users[userId];
      io.emit("getOnlineUsers", Object.keys(users));
    });
  });

  return server;
};

export { io };
