import axios from "axios";

const Router = require("koa-router");

const router = new Router({
  prefix: "/steam",
});

let items = [
  { id: 100, iname: "Quartz Analog Wrist Watch", price: "US $4.99" },
  { id: 101, iname: "Leather Peep Pump Heels", price: "US $33.56" },
  { id: 102, iname: "Apple iPod", price: "US $219.99" },
  { id: 103, iname: "Prince Phantom 97P Tennnis Racket", price: "US $50.00" },
];

router.get("/", (ctx: any, next: any) => {
  ctx.body = "ola";
  next();
});

router.get("/:steamid", async (ctx: any, next: any) => {
  await axios
    .get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5245281D86DDFB8692EDA625BE94E6B1&steamids=${ctx.params.steamid}`
    )
    .then((res: any) => {
      ctx.body = res.data.response.players[0]
      return
    })
    .catch((error: any) => {
      ctx.response.status = 404;
      ctx.body = "Player Not Found";
    });

  next();
});

module.exports = router;
