const commentsRouter = require("express").Router();
const {
  patchCommentsById,
  deleteCommentsById
} = require("../Controllers/commentsController");
const { send405Errors } = require("../errorHandling");

commentsRouter
  .route("/:commentid")
  .patch(patchCommentsById)
  .delete(deleteCommentsById)
  .all(send405Errors);

module.exports = commentsRouter;
