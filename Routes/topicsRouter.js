const topicsRouter = require("express").Router();
const { getAllTopics } = require("../Controllers/topicscontroller");

topicsRouter.route("/").get(getAllTopics);

module.exports = topicsRouter;
