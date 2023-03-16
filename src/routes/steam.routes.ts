import axios from "axios";
import Router from 'koa-router'
import { getBySteamId, getMapStatsPlayerBySteamId, getStatsPlayerBySteamId } from "../Controllers/SteamController";

const router = new Router({
  prefix: "/steam",
});

router.get("/", async (ctx: any, next: any) => {
  ctx.body = 'API is OK!'
  next();
});

router.get("/:steamid", async (ctx: any, next: any) => {
  const response = await getBySteamId(ctx.params.steamid);
  ctx.body = response
  next();
});

router.get("/stats/:steamid", async (ctx: any, next: any) => {
  const response = await getStatsPlayerBySteamId(ctx.params.steamid);
  ctx.body = response
  next();
});

router.get("/stats/map/:steamid", async (ctx: any, next: any) => {
  const response = await getMapStatsPlayerBySteamId(ctx.params.steamid);
  ctx.body = response
  next();
});

module.exports = router;
