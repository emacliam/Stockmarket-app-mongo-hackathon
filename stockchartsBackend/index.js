const express = require("express");
const mongoose = require("mongoose");
const Router = require("./router")
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(Router);
app.use(cors())


mongoose.connect('mongodb+srv://MongoHackathon:stockexchange@cluster0.rldiyxw.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 1000 * 60 * 110,
    socketTimeoutMS: 1000 * 60 * 110,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connected successfully");
});



app.listen(9000, () => {
  console.log("Server is running at port 9000");
  console.log("Waiting for database connection...");
});