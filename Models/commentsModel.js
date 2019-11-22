const connection = require("../db/connection");
const updateCommentsById = (id, body) => {
  return connection("comments")
    .where("comment_id", id)
    .increment("votes", body.inc_votes)
    .returning("*")
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({ msg: "comment id not found", status: 404 });
      } else {
        return comment;
      }
    });
};

const destroyCommentsById = id => {
  return connection("comments")
    .where("comment_id", id)
    .delete()
    .then(comment => {
      if (comment === 0) {
        return Promise.reject({ msg: "comment id not found", status: 404 });
      }
    });
};

module.exports = { updateCommentsById, destroyCommentsById };
