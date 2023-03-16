"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Koa = require("koa");
const http = require("http");
const socket = require("socket.io");
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");
const json = require("koa-json");
require("dotenv").config();
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
});
io.on("connection", (socket) => {
    // pedido de amizade recebido
    socket.on("invite_received", (data) => {
        io.emit("invite_received_front", data);
    });
    // usuario entra pelo link na lobby
    socket.on("player_join_lobby", (data) => {
        io.emit("player_join_lobby_front", data);
    });
    socket.on("player_closed_lobby", (data) => {
        io.emit("player_closed_lobby_front", data);
    });
    socket.on("player_leave_lobby", (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield io.emit("player_leave_lobby_front", data);
    }));
    socket.on("looby_ready_to_play", (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield io.emit("looby_ready_to_play_front", data);
    }));
    socket.on("looby_not_ready_to_play", (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield io.emit("looby_not_ready_to_play_front", data);
    }));
    // socket.on("disconnect", () => {
    //   console.log("[SOCKET] - disconnect");
    // });
});
server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`listening on port ${SERVER_PORT}`);
});
