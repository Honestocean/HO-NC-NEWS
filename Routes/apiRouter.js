const apiRouter = require("express").Router();
const topicsRouter = require("../Routes/topicsRouter");
const usersRouter = require("../Routes/usersRouter");
const articlesRouter = require("../Routes/articlesRouter");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
module.exports = apiRouter;
