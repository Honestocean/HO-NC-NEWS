const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById
} = require("../Controllers/articlesController");

articlesRouter
  .route("/:articleid")
  .get(getArticleById)
  .patch(patchArticleById);

module.exports = articlesRouter;
