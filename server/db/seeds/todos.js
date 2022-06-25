
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    {id: 1, title: 'databases work!', description: 'do ticket number 45 and complete migrations!', importance_level_id: 3, theme_id: 1},
    {id: 2, title: 'Suprise party', description: 'organise suprise party for friend!', importance_level_id: 1, theme_id: 2},
    {id: 3, title: 'Go to gym', description: 'do full body exercise with friends!', importance_level_id: 2, theme_id: 3},
    {id: 4, title: 'Apply for jobs', description: 'Apply for work, ugh!!! -- I really dont feel like it', importance_level_id: 3, theme_id: 1},
  ]);
};
