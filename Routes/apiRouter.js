const apiRouter = require("express").Router();
const topicsRouter = require("../Routes/topicsRouter");

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
