exports.up = function(knex) {
  console.log("creating houses table...");
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable
      .string("slug")
      .unique()
      .primary();
    topicsTable.string("description").notNullable();
  });
};

exports.down = function(knex) {
  console.log("removing tables");
  return knex.schema.dropTable("topics");
};
