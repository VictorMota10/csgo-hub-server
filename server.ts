const Koa = require("koa");
const http = require("http");
const socket = require("socket.io");
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");
const json = require("koa-json");
require('dotenv').config();

let steamRoutes = require("./src/routes/steam.routes");

const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;

const app = new Koa();
// middleware functions
app.use(koaBody());
app.use(json());
app.use(cors());

app.use(steamRoutes.routes());

const server = http.createServer(app.callback());
const io = socket(server, {
  cors: {
    origin: "*",
  },
})
io.on("connection", (socket: any) => {
  socket.on("test.event", (data: any) => {
    io.emit("test.event", data);
  });
  socket.on("disconnect", () => {
    console.log("[SOCKET] - disconnect");
  });
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});
