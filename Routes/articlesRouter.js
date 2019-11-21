const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentsByArticle,
  getCommentsByArticle,
  getAllArticles
} = require("../Controllers/articlesController");

articlesRouter.route("/").get(getAllArticles);

articlesRouter
  .route("/:articleid")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:articleid/comments")
  .post(postCommentsByArticle)
  .get(getCommentsByArticle);

module.exports = articlesRouter;
