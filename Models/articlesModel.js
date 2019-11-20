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
  console.log("in the model");
  return connection("articles")
    .where("article_id", id)
    .increment("votes", body.inc_votes)
    .returning("*");
};

const addCommentsByArticle = (id, body) => {
  console.log("in the model");

  const commentObj = {
    comment_id: 100,
    author: body.username,
    article_id: id,
    votes: 0,
    created_at: new Date(),
    body: body.body
  };

  return connection

    .insert(commentObj)
    .into("comments")
    .returning("*");
};

const selectCommentsByArticle = (id, { sort_by }, { order }) => {
  console.log("in the model");
  console.log(id);
  return connection
    .select("*")
    .from("comments")
    .where("article_id", id)
    .orderBy(sort_by || "created_at", order || "desc");
};

module.exports = {
  selectArticleById,
  updateArticleById,
  addCommentsByArticle,
  selectCommentsByArticle
};
