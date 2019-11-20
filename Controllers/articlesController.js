const {
  selectArticleById,
  updateArticleById
} = require("../Models/articlesModel");

exports.getArticleById = (req, res, next) => {
  id = req.params.articleid;
  selectArticleById(id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const id = req.params.articleid;
  const body = req.body;
  updateArticleById(id, body)
    .then(article => {
      res.status(202).send({ article });
    })
    .catch(next);
};
