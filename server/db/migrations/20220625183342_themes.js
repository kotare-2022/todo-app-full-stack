
exports.up = function(knex) {
  return knex.schema.createTable('themes', function (table) {
    table.increments('id').primary() // pk
    table.string('description')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('themes')
};
