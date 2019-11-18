exports.up = function(knex) {
  console.log("creating article table");
  return knex.schema.createTable("articles", articleTable => {
    articleTable.increments("article_id").primary();
    articleTable.string("title").notNullable();
    articleTable.text("body").notNullable();
    articleTable.integer("votes");
    articleTable.string("topic").references("topics.slug");
    articleTable.string("author").references("users.username");
    articleTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  console.log("removing article table");
  return knex.schema.dropTable("articles");
};
