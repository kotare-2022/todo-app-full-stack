
exports.up = function(knex) {
  return knex.schema.alterTable('todos', function (table) {
    table.integer('importance_level_id') // <-- create col
    table.foreign('importance_level_id') // then set fk
      .references('importance_levels.id')
    
    table.integer('theme_id')
    table.foreign('theme_id')
      .references('themes.id')
  })
};

exports.down = function(knex) {
  // not dropping table here, just dropping columns exclusively
  return knex.schema.alterTable('todos', function (table) {
    table.dropColumn('importance_level_id')
    table.dropColumn('theme_id')
  })
};
