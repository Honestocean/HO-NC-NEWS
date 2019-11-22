const connection = require("../db/connection");

const selectAllArticles = (sort_by, order, author, topic) => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("comment_id AS comment_count")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ topic });
    })
    .then(articles => {
      // check topic/author exist

      const topicQuery = topic
        ? checkIfQueriesExist(topic, "slug", "topics")
        : undefined;

      const authorQuery = author
        ? checkIfQueriesExist(author, "username", "users")
        : undefined;

      return Promise.all([authorQuery, topicQuery, articles]);
    })
    .then(([authorQuery, topicQuery, articles]) => {
      if (articles.length === 0) {
        if (topicQuery === false) {
          return Promise.reject({
            msg: "bad query, topic not found in database",
            status: 404
          });
        } else if (topicQuery === true) {
          return articles;
        } else if (authorQuery === false) {
          return Promise.reject({
            msg: "bad query, author not found in database",
            status: 404
          });
        } else {
          return articles;
        }
      } else {
        return articles;
      }
    });
};

const checkIfQueriesExist = (query, column, table) => {
  return connection
    .select("*")
    .from(table)
    .where(column, query)
    .returning("*")
    .then(row => {
      if (row.length === 0) {
        return false;
      } else {
        return true;
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
        return article[0];
      }
    });
};

const updateArticleById = (id, body) => {
  return connection("articles")
    .where("article_id", id)
    .increment("votes", body.inc_votes || 0)
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
