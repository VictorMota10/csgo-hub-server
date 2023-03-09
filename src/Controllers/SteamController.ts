import axios from "axios";

export async function getBySteamId(steamID: any) {
  let result;
  try {
    await axios
      .get(
        `${process.env.STEAM_API_URL}/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY_SECRET}&steamids=${steamID}`
      )
      .then((res: any) => {
        result = res.data.response.players[0];
        return result;
      })
      .catch((error: any) => {
        result = error
      });

    return result;
  } catch (error) {}
}
