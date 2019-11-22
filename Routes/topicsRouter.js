const topicsRouter = require("express").Router();
const { getAllTopics } = require("../Controllers/topicscontroller");
const { send405Errors } = require("../errorHandling");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all(send405Errors);

module.exports = topicsRouter;
