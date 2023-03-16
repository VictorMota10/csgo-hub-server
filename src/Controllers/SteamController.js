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
exports.getMapStatsPlayerBySteamId = exports.getStatsPlayerBySteamId = exports.getBySteamId = void 0;
const axios_1 = __importDefault(require("axios"));
function getBySteamId(steamID) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            yield axios_1.default
                .get(`${process.env.STEAM_API_URL}ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY_SECRET}&steamids=${steamID}`)
                .then((res) => {
                result = res.data.response.players[0];
                return result;
            })
                .catch((error) => {
                result = error;
            });
            return result;
        }
        catch (error) { }
    });
}
exports.getBySteamId = getBySteamId;
function getStatsPlayerBySteamId(steamID) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        const config = {
            method: "get",
            url: `${process.env.TRN_STEAM_API_URL}${steamID}`,
            headers: {
                "TRN-Api-Key": "2e001317-4c8c-477b-91f4-5c4d497025cf",
            },
        };
        try {
            yield (0, axios_1.default)(config)
                .then(function (response) {
                result = JSON.stringify(response.data);
            })
                .catch(function (error) {
                result = error;
            });
            return result;
        }
        catch (error) { }
    });
}
exports.getStatsPlayerBySteamId = getStatsPlayerBySteamId;
function getMapStatsPlayerBySteamId(steamID) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            yield axios_1.default.get(`${process.env.STEAM_API_URL}ISteamUserStats/GetUserStatsForGame/v0002/?key=${process.env.STEAM_KEY_SECRET}&steamid=${steamID}&appid=730`)
                .then(function (response) {
                result = JSON.stringify(response.data);
            })
                .catch(function (error) {
                result = error;
            });
            return result;
        }
        catch (error) { }
    });
}
exports.getMapStatsPlayerBySteamId = getMapStatsPlayerBySteamId;
