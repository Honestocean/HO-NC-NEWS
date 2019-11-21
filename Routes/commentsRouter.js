const commentsRouter = require("express").Router();
const {
  patchCommentsById,
  deleteCommentsById
} = require("../Controllers/commentsController");

commentsRouter
  .route("/:commentid")
  .patch(patchCommentsById)
  .delete(deleteCommentsById);

module.exports = commentsRouter;
