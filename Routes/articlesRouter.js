const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentsByArticle,
  getCommentsByArticle,
  getAllArticles
} = require("../Controllers/articlesController");
const { send405Errors } = require("../errorHandling");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(send405Errors);

articlesRouter
  .route("/:articleid")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(send405Errors);

articlesRouter
  .route("/:articleid/comments")
  .post(postCommentsByArticle)
  .get(getCommentsByArticle)
  .all(send405Errors);

module.exports = articlesRouter;
