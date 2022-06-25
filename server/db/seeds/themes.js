/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('themes').del()
  await knex('themes').insert([
    {id: 1, description: 'work'},
    {id: 2, description: 'social'},
    {id: 3, description: 'personal'}
  ]);
};
