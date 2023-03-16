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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const koa_cors_1 = __importDefault(require("koa-cors"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_json_1 = __importDefault(require("koa-json"));
const dotenv_1 = require("dotenv");
// const Koa = require("koa");
// const http = require("http");
// const socket = require("socket.io");
// const cors = require("@koa/cors");
// const { koaBody } = require("koa-body");
// const json = require("koa-json");
(0, dotenv_1.config)();
let steamRoutes = require("./src/routes/steam.routes");
const SERVER_PORT = process.env.PORT;
const app = new koa_1.default();
// middleware functions
app.use((0, koa_body_1.default)());
app.use((0, koa_json_1.default)());
app.use((0, koa_cors_1.default)());
app.use(steamRoutes.routes());
const server = http_1.default.createServer(app.callback());
const io = new socket_io_1.Server(server, {
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
server.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`);
});
