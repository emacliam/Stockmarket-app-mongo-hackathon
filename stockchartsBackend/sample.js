const WebSocket = require("ws");
const DerivAPIBasic = require("@deriv/deriv-api/dist/DerivAPI");
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.34136
const connection = new WebSocket(
  `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic({ connection });

const tickResponse = (res) => {
  console.log(JSON.parse(res.data).ohlc);

  // After 15 seconds, will stop tick response.
 /*  setTimeout(async () => {
    connection.removeEventListener("message", tickResponse, false);
    await api.disconnect();
  }, 15000); */
};

const ticks = async () => {
  const data = await api.candles("R_100");
  connection.addEventListener("message", tickResponse);
};

ticks();
