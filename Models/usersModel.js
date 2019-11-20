const connection = require("../db/connection");

const selectUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username: username })
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          msg: "article does not exist",
          status: 404
        });
      } else {
        return user;
      }
    });
};

module.exports = { selectUserById };
