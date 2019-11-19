const connection = require("../db/connection");

const selectArticleById = id => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id: id });
};

module.exports = { selectArticleById };
