
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('importance_levels').del()
  await knex('importance_levels').insert([
    {id: 1, description: 'urgent'},
    {id: 2, description: 'note'},
    {id: 3, description: 'later'}
  ]);
};
