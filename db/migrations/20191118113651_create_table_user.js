exports.up = function(knex) {
  console.log("creating user table..");
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .unique();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name").notNullable();
  });
};

exports.down = function(knex) {
  console.log("dropping user table");
  return knex.schema.dropTable("users");
};
