const connection = require("../db/connection");

const selectArticleById = id => {
  console.log(id);
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", id)
    .groupBy("articles.article_id")
    .count("comment_id as comment_count")
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          msg: "article does not exist",
          status: 404
        });
      } else {
        return article;
      }
    });
};

const updateArticleById = (id, body) => {
  return connection("articles")
    .where("article_id", id)
    .increment("votes", body.inc_votes)
    .returning("*");
};

module.exports = { selectArticleById, updateArticleById };
