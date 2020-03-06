exports.up = function(knex) {
  return knex.schema
    .createTable("Test_Users", tbl => {
      tbl
        .increments("User_Id")
        .unique()
        .primary();

      tbl.string("username").notNullable();
      tbl.string("password").notNullable();
      tbl
        .string("Email")
        .unique()
        .notNullable();
      tbl.string("First_Name").notNullable();
      tbl.string("Last_Name").notNullable();
    })

    .createTable("Test_Guides", tbl => {
      tbl
        .increments("Guides_Id")
        .unique()
        .primary();

      tbl.string("title").notNullable();
      tbl.string("description").notNullable();
      tbl.string("category").notNullable();
      tbl.string("difficulty").notNullable();
      tbl.integer("likes");
      tbl.integer("tries");
      tbl.integer("upVotes");
      tbl.integer("downVotes");
      tbl
        .integer("Creators_User_Id")
        .references("User_Id")
        .inTable("Test_Users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("Test_Steps", tbl => {
      tbl
        .increments("Step_Id")
        .unique()
        .primary();

      tbl.string("description").notNullable();
      // tbl.
      tbl
        .integer("Guide_Id")
        .references("Guides_Id")
        .inTable("Test_Guides")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("Test_Reviews", tbl => {
      tbl
        .increments("review_Id")
        .unique()
        .primary();

      tbl.string("review_body").notNullable();
      tbl
        .integer("Guide_Id")
        .references("Guides_Id")
        .inTable("Test_Guides")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("User_Id")
        .references("User_Id")
        .inTable("Test_Users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("Test_Reviews")
    .dropTableIfExists("Test_Steps")
    .dropTableIfExists("Test_Guides")
    .dropTableIfExists("Test_Users");
};
