
exports.up = function(knex) {
  return knex.schema.createTable('importance_levels', function (table) {
    table.increments('id').primary()
    table.string('description')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('importance_levels')
};
