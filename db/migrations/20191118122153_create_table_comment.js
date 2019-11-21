exports.up = function(knex) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes");
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now(6));
    commentsTable.text("body");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
