const articlesRouter = require("express").Router();
const { getArticleById } = require("../Controllers/articlesController");

articlesRouter.use("/:articleid", getArticleById);

module.exports = articlesRouter;
