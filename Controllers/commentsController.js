const {
  updateCommentsById,
  destroyCommentsById
} = require("../Models/commentsModel");

exports.patchCommentsById = (req, res, next) => {
  body = req.body;
  id = req.params.commentid;
  // if ("inc_votes" in req.body !== true) {
  //   next({ msg: "invalid body submitted", status: 400 });
  // } else {
  updateCommentsById(id, body)
    .then(comment => {
      res.status(200).send({ comment: comment[0] });
    })
    .catch(next);
  // }
};

exports.deleteCommentsById = (req, res, next) => {
  const id = req.params.commentid;
  destroyCommentsById(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
