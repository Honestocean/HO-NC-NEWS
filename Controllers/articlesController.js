const {
  selectArticleById,
  updateArticleById,
  addCommentsByArticle,
  selectCommentsByArticle,
  selectAllArticles
} = require("../Models/articlesModel");

exports.getAllArticles = (req, res, next) => {
  const sort_by = req.query.sort_by;
  const order = req.query.order;
  const author = req.query.author;
  const topic = req.query.topic;
  selectAllArticles(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

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
  // if ("inc_votes" in req.body !== true) {
  //   next({ msg: "invalid body submitted", status: 400 });
  // } else {
  updateArticleById(id, body)
    .then(article => {
      res.status(200).send({ article: article[0] });
    })
    .catch(next);
  // }
};

exports.postCommentsByArticle = (req, res, next) => {
  const id = req.params.articleid;
  const body = req.body;
  if ("username" in req.body !== true || "body" in req.body !== true) {
    next({ msg: "invalid body of submitted post", status: "400" });
  } else {
    addCommentsByArticle(id, body)
      .then(comment => {
        res.status(201).send({ comment: comment[0] });
      })
      .catch(next);
  }
};

exports.getCommentsByArticle = (req, res, next) => {
  const id = req.params.articleid;
  selectCommentsByArticle(id, req.query, req.query)
    .then(comments => {
      if (comments.length === 0) {
        next({ msg: "id not found or no comments attached", status: 404 });
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch(next);
};
