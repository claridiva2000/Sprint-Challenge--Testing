
exports.up = function(knex) {
  return knex.schema.createTable('games', tbl =>{
    tbl.increments();
    tbl.string('title').notNullable();
    tbl.string('genre').notNullable();
    tbl.string('releaseYear')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('games');
};
