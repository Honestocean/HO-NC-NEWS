const usersRouter = require("express").Router();
const { getUserById } = require("../Controllers/usersController");
const { send405Errors } = require("../errorHandling");

usersRouter
  .route("/:username")
  .get(getUserById)
  .all(send405Errors);

module.exports = usersRouter;
