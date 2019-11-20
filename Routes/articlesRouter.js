const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentsByArticle,
  getCommentsByArticle
} = require("../Controllers/articlesController");

articlesRouter
  .route("/:articleid")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:articleid/comments")
  .post(postCommentsByArticle)
  .get(getCommentsByArticle);

module.exports = articlesRouter;
