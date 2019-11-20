const { selectUserById } = require("../Models/usersModel");

exports.getUserById = (req, res, next) => {
  username = req.params.username;
  selectUserById(username)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};
