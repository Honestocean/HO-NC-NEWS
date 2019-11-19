const { selectArticleById } = require("../Models/articlesModel");

exports.getArticleById = (req, res, next) => {
  id = req.params.articleid;
  selectArticleById(id).then(({ article }) => {
    console.log(article, "Back to controller");
  });
};
