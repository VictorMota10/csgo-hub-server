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
Object.defineProperty(exports, "__esModule", { value: true });
const SteamController_1 = require("../Controllers/SteamController");
const Router = require("koa-router");
const router = new Router({
    prefix: "/steam",
});
router.get("/", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = 'API is OK!';
    next();
}));
router.get("/:steamid", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, SteamController_1.getBySteamId)(ctx.params.steamid);
    ctx.body = response;
    next();
}));
router.get("/stats/:steamid", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, SteamController_1.getStatsPlayerBySteamId)(ctx.params.steamid);
    ctx.body = response;
    next();
}));
router.get("/stats/map/:steamid", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, SteamController_1.getMapStatsPlayerBySteamId)(ctx.params.steamid);
    ctx.body = response;
    next();
}));
module.exports = router;
