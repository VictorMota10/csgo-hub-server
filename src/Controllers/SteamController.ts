import axios from "axios";

export async function getBySteamId(steamID: any) {
  let result;
  try {
    await axios
      .get(
        `${process.env.STEAM_API_URL}ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY_SECRET}&steamids=${steamID}`
      )
      .then((res: any) => {
        result = res.data.response.players[0];
        return result;
      })
      .catch((error: any) => {
        result = error;
      });

    return result;
  } catch (error) {}
}

export async function getStatsPlayerBySteamId(steamID: any) {
  let result;
  const config = {
    method: "get",
    url: `${process.env.TRN_STEAM_API_URL}${steamID}`,
    headers: {
      "TRN-Api-Key": "2e001317-4c8c-477b-91f4-5c4d497025cf",
    },
  };

  try {
    await axios(config)
      .then(function (response) {
        result = JSON.stringify(response.data)
      })
      .catch(function (error) {
        console.log(error);
        result = error
      });

    return result;
  } catch (error) {}
}

export async function getMapStatsPlayerBySteamId(steamID: any) {
  let result;

  try {
    await axios.get(
      `${process.env.STEAM_API_URL}ISteamUserStats/GetUserStatsForGame/v0002/?key=${process.env.STEAM_KEY_SECRET}&steamid=${steamID}&appid=730`
    )
      .then(function (response) {
        result = JSON.stringify(response.data)
      })
      .catch(function (error) {
        console.log(error);
        result = error
      });

    return result;
  } catch (error) {}
}
