const express = require("express");
const CandlesModel = require("./models");
const app = express();
/* 34136 */
const WebSocket = require('ws');
const DerivAPI = require('@deriv/deriv-api/dist/DerivAPI');
const app_id = 34136;
const connection = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPI({ connection});



async function candles(c){
  console.log('symbol',c)
  const data = await api.candles({symbol:'R_100'});
 return connection.addEventListener("message", tickResponse);
};

const tickResponse = (res) => {
  console.log(JSON.parse(res.data).ohlc);
    const candle = new CandlesModel({
      raw:JSON.parse(res.data).ohlc,
      high:JSON.parse(res.data).ohlc?.high,
      low:JSON.parse(res.data).ohlc?.low,
      open:JSON.parse(res.data).ohlc?.open,
      close:JSON.parse(res.data).ohlc?.close
    })
    candle.save()
};
app.get("/candles/:symbol", async (request, response) => {
    try {   
      candles(request.params.symbol)
      response.json({
        success: true,
      })
    } catch (error) {
      response.status(500).send(error);
      
    }
});

app.get("/cancel", async (request, response) => {
  try {   
    connection.removeEventListener("message", tickResponse, false);
    response.json({
      success: true,
    })
  } catch (error) {
    response.status(500).send(error);
    
  }
});


module.exports = app;