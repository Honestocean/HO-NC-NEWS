const usersRouter = require("express").Router();
const { getUserById } = require("../Controllers/usersController");

usersRouter.route("/:username").get(getUserById);

module.exports = usersRouter;
