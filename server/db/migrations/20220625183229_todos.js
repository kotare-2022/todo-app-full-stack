
exports.up = function(knex) {
  return knex.schema.createTable('todos', function (table) {
    table.increments('id').primary() // sets as pk
    table.string('title')
    table.string('description')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos')
};
