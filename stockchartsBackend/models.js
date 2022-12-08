const mongoose = require("mongoose");

const CandlesSchema = new mongoose.Schema({
  raw: {
    type: Object,
  },
  open: {
    type: String,
    default: 0,
  },
  close: {
    type: String,
    default: 0,
  },
  high: {
    type: String,
    default: 0,
  },
  low: {
    type: String,
    default: 0,
  },
});

const Candles = mongoose.model("Candles", CandlesSchema);

module.exports = Candles;