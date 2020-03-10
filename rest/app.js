require("dotenv").config();

const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const cors = require("cors");

// settings
const portNumber = process.env.REST_PORT || 5000;

// set up express app
const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());

app.use("/api", routes);

// error handling middleware
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(422).send({ error: err.message });
});

// listen for request
app.listen(portNumber, function() {
  console.log(`Listening for requests at ${portNumber}`);
});
