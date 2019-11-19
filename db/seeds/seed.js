const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  //const topicsInsertions = knex("topics").insert(topicData);
  //const usersInsertions = knex("users").insert(userData);

  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicData)
        .returning("*");
    })
    .then(topics => {
      // console.log(topics, "we seeded the topics");

      return knex("users")
        .insert(userData)
        .returning("*");
    })
    .then(users => {
      // console.log(users, "We seeded the users");
      return knex("articles")
        .insert(formatDates(articleData))
        .returning("*");
    })
    .then(articles => {
      console.log(articles, "we seeded the articles");
      let newRefObj = makeRefObj(articles, "title", "article_id");
      let formattedComments = formatComments(commentData, newRefObj);
      return knex("comments").insert(formattedComments);
    });
};
