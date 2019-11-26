const express = require("express");
const app = express();
const apiRouter = require("./Routes/apiRouter");
const {
  handleCustomErrors,
  handlePSQLErrors,
  send405Errors
} = require("./errorHandling");

app.use(express.json());

app.use("/api", apiRouter).all("/api", send405Errors);

app.all("/*", (req, res, next) => res.status(404).send("Route not found"));

app.use(handleCustomErrors);

app.use(handlePSQLErrors);

module.exports = app;
