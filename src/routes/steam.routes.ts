import axios from "axios";
import { getBySteamId } from "../Controllers/SteamController";

const Router = require("koa-router");

const router = new Router({
  prefix: "/steam",
});

router.get("/:steamid", async (ctx: any, next: any) => {
  const response = await getBySteamId(ctx.params.steamid);
  ctx.body = response
  next();
});

module.exports = router;
