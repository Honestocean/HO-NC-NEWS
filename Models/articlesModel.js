const connection = require("../db/connection");

const selectAllArticles = (sort_by, order, author, topic) => {
  return connection
    .select("*")
    .from("articles")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) query.where({ author });
      if (topic) query.where({ topic });
    })
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({
          msg: "bad query, not found in database",
          status: 404
        });
      } else {
        return articles;
      }
    });
};

const selectArticleById = id => {
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

const addCommentsByArticle = (id, body) => {
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
  selectCommentsByArticle,
  selectAllArticles
};
