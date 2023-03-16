import Koa from 'koa'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'koa-cors'
import koaBody from 'koa-body'
import json from 'koa-json'
import { config } from 'dotenv'
// const Koa = require("koa");
// const http = require("http");
// const socket = require("socket.io");
// const cors = require("@koa/cors");
// const { koaBody } = require("koa-body");
// const json = require("koa-json");
config()

let steamRoutes = require("./src/routes/steam.routes");

const SERVER_PORT = process.env.PORT

const app = new Koa();
// middleware functions
app.use(koaBody());
app.use(json());
app.use(cors());

app.use(steamRoutes.routes());

const server = http.createServer(app.callback());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  // pedido de amizade recebido
  socket.on("invite_received", (data: any) => {
    io.emit("invite_received_front", data);
  });

  // usuario entra pelo link na lobby
  socket.on("player_join_lobby", (data: any) => {
    io.emit("player_join_lobby_front", data);
  });

  socket.on("player_closed_lobby", (data: any) => {
    io.emit("player_closed_lobby_front", data);
  });

  socket.on("player_leave_lobby", async (data: any) => {
    await io.emit("player_leave_lobby_front", data);
  });

  socket.on("looby_ready_to_play", async (data: any) => {
    await io.emit("looby_ready_to_play_front", data);
  });

  socket.on("looby_not_ready_to_play", async (data: any) => {
    await io.emit("looby_not_ready_to_play_front", data);
  });

  // socket.on("disconnect", () => {
  //   console.log("[SOCKET] - disconnect");
  // });
});

server.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});
